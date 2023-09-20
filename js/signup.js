
    $(() => {
        const $btSignupObj = $('form.signup>div.sign>button[type=submit]')
        const $idObj = $('form.signup>div.id>label>input[name=id]')
        $idObj.focus(() => {
            // $btSignupObj.hide()
            $btSignupObj.parent().hide()
        })
    
        const $btDupchkObj = $('form.signup>div.id>button[type=button]')

        $btDupchkObj.click(() => {
            $.ajax({
                url: 'http://192.168.1.12:8888/back/iddupchk',
                method : 'get',
                data : `id=${$idObj.val()}`,
                success : (responseJSONObj)=>{
                    console.log(responseJSONObj.status)
                    if(responseJSONObj.status == 1){
                        console.log($btSignupObj)
                        // $btSignupObj.show()
                        $btSignupObj.parent().show()
                    }else{
                        alert('이미 사용중인 아이디입니다')
                    }
                }
            })
        })

        const $formObj = $('form.signup')
    
 
        $formObj.submit((e) => {
            // const $pwdArr = $('form.signup>div.pwd>label>input[name=pwd]') //비밀번호 입력란 객체
            // const $nameObj = $('form.signup>div.name>label>input[name=name]') //이름입력용 객체
            // if ($pwdArr.eq(0).val() != $pwdArr.eq(1).val()) {
            //     alert('비밀번호를 다시 입력하세요')
            //     $pwdArr.eq(0).focus()
            //     $pwdArr.eq(0).select()
            //     //e.preventDefault()
            const $pwd = $('form.signup>div.pwd>label>input[name=pwd]')
            const $pwd2 = $('form.signup>div.pwd2>label>input[type=text]')
            if($pwd.val() != pwd2.val()){
                alert('비밀번호를 다시 입력하세요')
                $pwd.focus()
                e.preventDefault()
            }
            else{
                //console.log($('form').serialize()) //serialize는 post방식의 요청일 때만 효과있음
                $.ajax({
                    url: 'http://192.168.1.12:8888/back/signup',
                    method : 'post',
                    //data : `id=${$idObj.val()}&pwd=${$pwdArr.eq(0).val()}&name=${$nameObj.val()}`,
                    //data : {id: $idObj.val() , pwd:$pwdArr.eq(0).val() , name: $nameObj.val() },
                    data : $('form').serialize(),
                    success : (responseJSONObj)=>{
                        if(responseJSONObj.status==1){
                            alert(responseJSONObj.msg)
                        }else{
                            alert(responseJSONObj.msg)
                        }
                    },
                    error: (jqxhr)=>{
                        alert(jqxhr.status)
                    }
                })
            }

            return false //e.preventDefault()+e.stopPrepagation() 효과
        })

    
    })