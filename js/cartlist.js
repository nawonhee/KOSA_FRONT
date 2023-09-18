$(()=>{
    $.ajax({
        xhrFields:{
            withCredentials: true
        },
        url: 'http://192.168.1.12:8888/back/cartlist',
        method : 'get',
        success:(resposeJSONObj)=>{
            // const p = resposeJSONObj[0].product
            // const q = resposeJSONObj[0].quantity
            //console.log(p,q)

            if(resposeJSONObj.msg != undefined){
                alert('장바구니 없습니다')
                return
            }
            
            const $originTrObj = $('div.cartlist>table>thead>tr')
            const $tbodyObj = $('div.cartlist>table>tbody')
            let totalPrice = 0;

            resposeJSONObj.forEach(element=>{
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.product
                const q = element.quantity

                const $prodNoTdObj = $('<td>')
                $prodNoTdObj.addClass('prodNo')
                $prodNoTdObj.append(p.prodNo)
                $copyTrObj.append($prodNoTdObj)

                const $prodNameTdObj = $('<td>')
                $prodNameTdObj.addClass('prodName')
                $prodNameTdObj.append(p.prodName)
                $copyTrObj.append($prodNameTdObj)

                const $prodPriceTdObj = $('<td>')
                $prodPriceTdObj.addClass('prodPrice')
                $prodPriceTdObj.append(p.prodPrice)
                $copyTrObj.append($prodPriceTdObj)

                const $quantityTdObj = $('<td>')
                $quantityTdObj.addClass('quantity')
                $quantityTdObj.append(q)
                $copyTrObj.append($quantityTdObj)

                $tbodyObj.append($copyTrObj)
            })
            
        }
    })

    //----주문하기 버튼객체에서 클릭이벤트가 발생했을 때 할 일 START----
    $('div.cartlist>button').click(()=>{
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: 'http://192.168.1.12:8888/back/addorder',
            method : 'get',
            success: (responseJSONObj)=>{
                if(responseJSONObj.status == 0){ //주문실패
                    alert(responseJSONObj.msg)
                }else{
                    $('nav>ul>li>a.orderlist').click()
                }
            }
        })
    })
    //----주문하기 버튼객체에서 클릭이벤트가 발생했을 때 할 일 END----
})