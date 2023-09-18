$(()=>{
    const savedId = localStorage.getItem('savedId')
    if(savedId != null){
        $('div>label>input[name=id]').val(savedId)
    }
    $('form').submit((e)=>{
        if($('div>input[type=checkbox]').prop('checked')){
            localStorage.setItem('savedId',$('div>label>input[name=id]').val())
        }else{
            localStorage.removeItem('savedId')
        }
        
        const idValue = $('div>label>input[name=id]').val()
        const pwdValue = $('div>label>input[name=pwd]').val()
        const data = `id=${idValue}&pwd=${pwdValue}`

        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: 'http://192.168.1.12:8888/back/login',
            method: 'POST',
            data : data,
            success: (responseJSONObj)=>{
                //alert(responseText)
                if(responseJSONObj.status == 0){ //실패인 경우
                    alert(responseJSONObj.msg)
                }else if(responseJSONObj.status == 1){
                    localStorage.setItem("loginedId", idValue)
                    location.href="./main.html"
                }
            },
            error:(jqXHR, textStatus)=>{
                alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
                //console.log(jqXHR)
            }
        })
        e.preventDefault()

    })
})