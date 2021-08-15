const { Users } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  // TODO: urclass의 가이드를 참고하여 POST /login 구현에 필요한 로직을 작성하세요.
  const userInfo = await Users.findOne({ where: {
    userId: req.body.userId,
    password: req.body.password
  }})

  if(!userInfo){
    //요청 거절
    res.status(400).json({ data: null, message: "not authorized" })
  } else{
    // 필요한 데이터를 담은 두 종류의 JWT(access, refresh)를 생성합니다.
    // 생성한 JWT를 적절한 방법으로 반환합니다.
    // access token은 클라이언트에서 react state로 다루고 있습니다.
    // refresh token은 클라이언트의 쿠키에서 다루고 있습니다.
    //console.log('+*+*+*+*', userInfo)
    //delete data.dataValues.password;
    const {id, userId, email, createdAt, updatedAt} = userInfo.dataValues; //위에서 찾은 1개의 user데이터(객체형태)
    const accessToken = jwt.sign(
      {id, userId, email, createdAt, updatedAt}, 
      process.env.ACCESS_SECRET, 
      {expiresIn: '1h'}
      );
    const refreshToken = jwt.sign(
      {id, userId, email, createdAt, updatedAt}, 
      process.env.REFRESH_SECRET, 
      {expiresIn: '7d'}
      );

    res.cookie('refreshToken', refreshToken, { //(쿠키이름, 쿠키 내 들어가야할 payload, {옵션...})
      sameSite: 'None',
      httpOnly: 'true',
      secure: 'true'
    });
    res.status(200).json({ 
      data: { 
        accessToken: accessToken
      }, 
      message: "ok" 
    })
  }
  
};