'use client';

import { useState } from 'react';
import o from '@sass/popup.module.sass';
import { Mfa, User } from '@util/schema';
import { QRCodeSVG } from 'qrcode.react';
import { useRouter } from 'next/navigation';
import { patchMfa } from '@util/helpers/client/User';
import { errorHandler } from '@util/helpers/Main';
import { Response } from '@util/schema';
import { AxiosError } from 'axios';

export default function Mfa({
    lang,
    u,
}: {
    lang: {
        btn: string;
        h1: string;
        p: string;
        cancel: string;
        change: string;
        labelCode: string;
        gotIt: string;
        recoveryCodes: string;
    };
    u: User;
}) {
    const router = useRouter();
    const [popup, setPopup] = useState<boolean>(false);
    const [dataPopup, setDataPopup] = useState<boolean>(true);
    const [mfaData, setMfaData] = useState<Mfa>();

    const handle = async (e: FormData, action: boolean) =>
        await patchMfa({ enabled: action, code: !action ? e.get('mfa')?.toString() : undefined })
            .then((mfa) => {
                if (action) {
                    setPopup(false);
                    setDataPopup(true);
                    setMfaData(mfa);
                } else router.refresh();
            })
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

    return (
        <>
            <li onClick={() => setPopup((p) => !p)}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M 4 3 C 2.895 3 2 3.895 2 5 L 2 7.1484375 C 2 7.5644375 2.2378125 7.9705625 2.6328125 8.1015625 C 3.4278125 8.3655625 4 9.116 4 10 C 4 10.884 3.4278125 11.634438 2.6328125 11.898438 C 2.2378125 12.029438 2 12.435562 2 12.851562 L 2 15 C 2 16.105 2.895 17 4 17 L 20 17 C 21.105 17 22 16.105 22 15 L 22 12.851562 C 22 12.435562 21.762187 12.029437 21.367188 11.898438 C 20.572188 11.634438 20 10.884 20 10 C 20 9.116 20.572187 8.3655625 21.367188 8.1015625 C 21.762188 7.9705625 22 7.5644375 22 7.1484375 L 22 5 C 22 3.895 21.105 3 20 3 L 4 3 z M 4.9003906 19 L 17.339844 21.929688 C 17.549844 21.979688 17.750937 22 17.960938 22 C 19.170938 22 20.270312 21.190234 20.570312 19.990234 L 20.820312 19 L 4.9003906 19 z"></path>
                </svg>

                <h1>
                    {lang.btn}
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                        <path
                            fill="currentColor"
                            d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                    </svg>
                </h1>
            </li>
            {popup ? (
                <div className={o.popup}>
                    <div className={o.container}>
                        <h1>{lang.h1}</h1>
                        <p>{lang.p}</p>
                        <form action={(e: FormData) => handle(e, !u.mfaEnabled)}>
                            {u.mfaEnabled ? (
                                <label>
                                    {lang.labelCode}
                                    <input type="text" required autoComplete="off" autoFocus={true} autoCorrect="off" id="mfa" name="mfa" placeholder="000000" />
                                </label>
                            ) : null}
                            <div className={o.footer}>
                                <button onClick={() => setPopup(false)} type="reset">
                                    {lang.cancel}
                                </button>
                                <button type="submit">{lang.change}</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
            {dataPopup && mfaData ? (
                <div className={o.popup}>
                    <div className={o.container}>
                        <h1>{lang.h1}</h1>
                        <p>{lang.p}</p>
                        <div className={o.image}>
                            <QRCodeSVG value={mfaData.secret.uri} size={166} bgColor={'#ffffff'} fgColor={'#000000'} includeMargin={true} />
                            <p>{mfaData.secret.secret}</p>
                        </div>
                        <h1>{lang.recoveryCodes}</h1>
                        <div className={o.codes}>
                            {mfaData.codes.map((code) => (
                                <p key={code}>{code}</p>
                            ))}
                        </div>
                        <form>
                            <div className={o.footer}>
                                <button onClick={() => setDataPopup(false)} type="reset">
                                    {lang.gotIt}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
