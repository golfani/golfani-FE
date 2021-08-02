import {NextApiRequest, NextApiResponse} from "next";

/**
 * API 테스트 코드
 * ID 가 gudwh14 일경우 중복임을 알려준다.
 * @param req
 * @param res
 */
const duplicate = (req : NextApiRequest, res : NextApiResponse<boolean>) => {
    const id = 'gudwh14';
    if(req.method == 'GET') {
        const member_id = req.query.member_id;
        if(id === member_id) {
            res.statusCode = 200;
            res.send(true)
        }
        else {
            res.statusCode = 200;
            res.send(false);
        }
    }
}

export default duplicate;