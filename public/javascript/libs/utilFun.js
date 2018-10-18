
const moment=require("moment");


const utilFun={

	//获取日期
	coverDate:function(dateFormat){
		Date.prototype.format = function (format) {
			var o = {
				"M+": this.getMonth() + 1, //month
				"d+": this.getDate(),    //day
				"h+": this.getHours(),   //hour
				"m+": this.getMinutes(), //minute
				"s+": this.getSeconds(), //second
				"q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
				"S": this.getMilliseconds() //millisecond
			}
			if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
				(this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o) if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
						("00" + o[k]).substr(("" + o[k]).length));
			return format;
		}
	
		return dataTime=new Date().format(dateFormat);
	
	},

	/**
	 * 返回数据格式
	 * @param {状态码} status 
	 * @param {数据} data 
	 */
	dataStyle:function(status,data){
        const successDate={
			code:status.code,
			msg:status.msg,
		};
		let dataList={};
		let datas={};
		if(data){
			// if(data.createTime){
				// data.createTime=data.createTime
			// }
			const result=JSON.parse(JSON.stringify(data));
			// console.log(moment);
			// console.log(moment(result[0].createTime).format("YYYY-MM-DD"));
			successDate.datas=dataList;
			successDate.datas.dataList=result;
		}
		return successDate;
	},

}

module.exports =utilFun

