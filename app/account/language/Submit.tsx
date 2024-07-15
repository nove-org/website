'use client';

import { useState } from 'react';
import o from './Language.module.sass';
import Loader from '@app/Loader';

export default function Submit({ lang }: { lang: { save: string; cancel: string } }) {
    const [loading, setLoading] = useState<boolean>(false);
    const triggerLoading = () => setLoading(true);
    return (
        <div className={o.buttons}>
            <button type="submit" className={'btn ' + (loading ? o.loading : o.primary)} onClick={() => triggerLoading()}>
                {loading ? <Loader type="button" /> : lang.save}
            </button>
            <button type="reset" className="btn">
                {lang.cancel}
            </button>
        </div>
    );
}
