const { Users } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /accesstokenrequest 구현에 필요한 로직을 작성하세요.

  // Authorizaion header에 담은 access token이 유효한지 서버가 가지고 있는 비밀 키로 생성한 토큰이 맞는지 확인합니다.
  const authorization = req.headers['authorization'];
  if (authorization === undefined) { //Authorization header에 토큰이 담겨져 있지 않을때
    res.status(400).json({ 
      data: null, 
      message: 'invalid access token' 
    });
  }
  // 왜 authorization.split을 사용하는지, 왜 1번째 인덱스의 값을 얻는지 console.log 사용해 확인해보세요!
  // req.headers의 속성이 아래와 같다!!!!

  // headers: {
  //   Authorization: `Bearer ${this.props.accessToken}`,
  //   "Content-Type": "application/json",
  // },
  //console.log('***********************', authorization)
  const token = authorization.split(' ')[1]; //1번째 인덱스에 암호화된 accessToken이 담겨 있다.(0번째 인덱스는 = 'Bearer')
  // console.log('***********************', authorization.split(' '))
  jwt.verify(token, process.env.ACCESS_SECRET, async(err, data)=>{
    if(err){ //해독할 시 에러..(해독할 수 없는 것)
      res.status(400).json({ 
        data: null, 
        message: 'invalid access token'
      });
    } else{
      const userInfo = await Users.findOne({
        where: { userId: data.userId } //해독하여 얻은 payload의 userId 속성.
      });
      if (!userInfo) {
        // 일치하는 유저가 없을 경우
        res.status(400).json({ 
          data: null, 
          message: 'access token has been tempered' 
        });
      } else {
        // 일치하는 유저가 있을 경우 필요한 데이터(id, userId, email, createdAt, updatedAt)를 응답에 담아 반환합니다.
        // delete data.dataValues.password;
        const { id, userId, email, createdAt, updatedAt } = userInfo.dataValues;
        res.status(200).json({ 
          data: { 
            userInfo: { id, userId, email, createdAt, updatedAt } 
          }, 
          message: 'ok'
        });
      }
    }
  });
};
