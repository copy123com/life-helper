'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// const a = event.params[0]
	// const b = event.params[1]
	// //返回数据给客户端
	return event
};
