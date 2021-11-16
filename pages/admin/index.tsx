import style from 'styles/admin.module.css'
import Link from 'next/link';

const Admin = () : JSX.Element => {
    return (
        <div className={style.container}>
            <h1>관리자 페이지</h1>
            <ul className={style.menu_box}>
                <li>
                    <Link href={'/admin/report'}>
                        <button className={style.menu_item}>신고 관리</button>
                    </Link>
                </li>
                <li className={style.menu_item}>
                    <Link href={'/admin/golf'}>
                        <button className={style.menu_item}>골프장비 관리</button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Admin;
