import style from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={`${style.wrap} container`}>
                <div>
                    © Copyright 2021 - GB
                </div>
            </div>
        </footer>
    );
};
