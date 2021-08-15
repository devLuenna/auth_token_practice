const { Users } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /refreshtokenrequest 구현에 필요한 로직을 작성하세요.
  // 요청에 담긴 refresh token이 유효하다면 새로운 access token을 발급해줌과 동시에 유저가 요청한 정보를 반환합니다.
  // 요청에 담긴 refresh token이 유효하지 않거나, 조작된 토큰일 경우 각각 다른 응답을 반환합니다.
  
  //cookie에 refresh token이 담겨있는지 확인합니다.
  const refreshToken = req.cookies['refreshToken'];
  if(!refreshToken){
    res.status(400).json({ 
      data: null, 
      message: "refresh token not provided" 
    })
  }
  //refresh token이 유효한지, 서버가 가지고 있는 비밀 키로 생성한 것이 맞는지 확인합니다.
  jwt.verify(refreshToken, process.env.REFRESH_SECRET, async(err, data)=>{
    if(err){ //유효한 토큰이 아닌 경우
      return res.json({
        data: null,
        message: 'invalid refresh token, please log in again',
      });
    } else{
      const userInfo = await Users.findOne({
        where: { userId: data.userId } //해독이 완료된 payload의 userId 속성.
      });

      if(!userInfo){ //일치하는 유저가 없을 경우: 
        res.status(400).json({ 
          data: null, 
          message: "refresh token has been tempered" 
        })
      } else { //일치하는 유저가 있을 경우: 필요한 데이터(id, userId, email, createdAt, updatedAt)를 응답에 담아 반환합니다.
        //delete data.dataValues.password;
        const { id, userId, email, createdAt, updatedAt } = userInfo.dataValues;
        const accessToken = jwt.sign( //새로운 accessToken을 발급해줌과 동시에 
          {id, userId, email, createdAt, updatedAt}, 
          process.env.ACCESS_SECRET, 
          {expiresIn: '1h'}
          );

        res.status(200).json({ //유저가 요청한 정보를 응답으로 반환
          data: {
            accessToken, 
            userInfo: { id, userId, email, createdAt, updatedAt } 
          }, 
          message: 'ok'
        });
      }
    }
  });
  
};
