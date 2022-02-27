import {onSilentRefresh} from "../src/utils/securityUtil";
import {getCookie} from "../src/utils/cookieUtil";

const Test = (): JSX.Element => {
    const userId = getCookie('userId');
    const onClick = async () => {
        await onSilentRefresh(userId);
    }
    return (
        <button onClick={onClick}>재발급</button>
    )
}

export default Test;
