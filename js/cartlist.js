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

            const $originTrObj = $('div.cartlist>table>thead')
            $originTrObj.siblings().remove()
            $originTrObj.show()

            resposeJSONObj.foreach(element=>{
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.product
                const q = element.quantity

                const prodno = p.prodNo
                const prodname = p.prodName
                const prodprice = p.prodPrice
                
                const tr = '<tr>'
                tr+='<td>'+p.prodNo+'</td>'
                    +'<td>'+p.prodName+'</td>'
                    +'<td>'+p.prodPrice+'</td>'
                    +'<td>'+q+'</td>'
                tr+='</tr>'
                
                $copyTrObj = tr

                $('div.cartlist>table>tbody').append($copyProduct)
        })
            

        }
    })
})