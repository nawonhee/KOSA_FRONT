
$(()=>{
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: 'http://192.168.1.12:8888/backspring/orderlist',
        method: 'get',
        success: (responseJSONObj) => {
            if(responseJSONObj.status == 0){
                alert(responseJSONObj.msg)
                return
            }
            const $originInfoDivObj = $('div.orderList>div.orderInfo') //원본
            console.log($originInfoDivObj)
            const $orderlistObj = $originInfoDivObj.parent() //부모
            responseJSONObj.list.forEach((info, index) => {
                // console.log(info)
                const $copyInfoDivObj = $originInfoDivObj.clone() //복제본
                $copyInfoDivObj.find('div.orderNo').html(info.orderNo) //주문번호
                $copyInfoDivObj.find('div.orderDt').html(info.orderDt) //주문일자
                
                const lines = info.lines //주문상세
                const $originLineDivObj = $copyInfoDivObj.find('div.line')
                const $LinesDivObj = $originLineDivObj.parent()

                lines.forEach(line=>{
                    const $copyLineDivObj = $originLineDivObj.clone();
                    $copyLineDivObj.find("div.prodNo").html(line.orderP.prodNo)
                    $copyLineDivObj.find("div.prodName").html(line.orderP.prodName)
                    $copyLineDivObj.find("div.prodPrice").html(line.orderP.prodPrice)
                    $copyLineDivObj.find("div.orderQuantity").html(line.orderQuantity)
                    $LinesDivObj.append($copyLineDivObj)
                })
                $orderlistObj.append($copyInfoDivObj)
                $originLineDivObj.hide()
            });//end for
            
        }
    })
})