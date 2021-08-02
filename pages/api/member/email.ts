import {NextApiRequest, NextApiResponse} from "next";


/**
 * 이메일 인증 API 테스트
 * @param req
 * @param res
 * @constructor
 */
const Email = (req : NextApiRequest, res : NextApiResponse<string>) => {
    if(req.method == 'POST') {
        const email = req.body.email;
        if(email) {
            res.statusCode = 200;
            res.send("123456");
        }
        else {
            res.statusCode = 409;
            res.send("이메일 에러");
        }
    }
}

export default Email;