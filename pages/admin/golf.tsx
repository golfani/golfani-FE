import style from 'styles/admin.module.css'
import ArrowBackIosNewIcon from "@material-ui/icons/ArrowBackIosNew";
import {useRouter} from "next/router";
import BrandList from "src/components/admin/golf/BrandList";

const Golf = () : JSX.Element => {
    const router = useRouter();

    const handleClickBackIcon = () => {
        router.push('/admin');
    }

    return (
        <div className={style.container}>
            <div className={style.header_box}>
                <ArrowBackIosNewIcon className={style.header_icon} onClick={handleClickBackIcon}/>
                <h1 className={style.header_title}>관리자 페이지 - 골프장비 관리</h1>
            </div>
            <div className={style.golf_box}>
                <BrandList/>
            </div>
        </div>
    );
};

export default Golf;
