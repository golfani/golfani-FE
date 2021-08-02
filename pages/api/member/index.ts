import {NextApiRequest, NextApiResponse} from "next";

const Member = (req : NextApiRequest,res : NextApiResponse) => {
    if(req.method == 'POST') {
        const member = req.body;
        if(member) {
            res.statusCode = 200;
            res.send(1);
        }
        else {
            res.statusCode = 409;
            res.send("회원가입 실패");
        }
    }
}

export default Member;