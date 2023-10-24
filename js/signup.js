
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
                url: backURL+'/iddupchk',
                method : 'get',
                data : `id=${$idObj.val()}`,
                // success : (responseJSONObj)=>{
                //     console.log(responseJSONObj.status)
                //     if(responseJSONObj.status == 1){
                //         console.log($btSignupObj)
                //         // $btSignupObj.show()
                //         $btSignupObj.parent().show()
                //     }else{
                //         alert('이미 사용중인 아이디입니다')
                //     }
                success: ()=>{
                    $btSignupObj.parent().show()
                },
                error: (jqxhr)=>{
                    // alert(jqxhr.status)
                    alert(jqxhr.responseText)
                    $idObj.select()
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
            if($pwd.val() != $pwd2.val()){
                alert('비밀번호를 다시 입력하세요')
                $pwd.focus()
                e.preventDefault()
            }
            else{
                //console.log($('form').serialize()) //serialize는 post방식의 요청일 때만 효과있음
                const fd = new FormData(e.target)
                $.ajax({
                    url: `${backURL}/signup`,
                    method : 'post',
                    //data : `id=${$idObj.val()}&pwd=${$pwdArr.eq(0).val()}&name=${$nameObj.val()}`,
                    //data : {id: $idObj.val() , pwd:$pwdArr.eq(0).val() , name: $nameObj.val() },
                    contentType: false, //파일첨부용 프로퍼티
                    processData : false, //파일첨부용 프로퍼티
                    data : fd,//$('form').serialize(),
                    success : (responseJSONObj)=>{
                        if(responseJSONObj.status==1){
                            alert(responseJSONObj.msg)
                            location.href = './main.html'
                        }else{
                            alert(responseJSONObj.msg)
                        }
                    },
                    error: (jqxhr)=>{
                        // alert(jqxhr.status)
                        alert(jqxhr.responseText)
                    }
                })
            }

            return false //e.preventDefault()+e.stopPrepagation() 효과
        })

        //----파일업로드용 테스트 폼객체에서 submit이벤트 발생했을 때 할 일 START ----
        const $uploadForm = $('form.form1')
        $uploadForm.submit((e)=>{
            const fd2 = new FormData(e.target)
            fd2.forEach((value,key)=>{
                console.log(key)
                console.log(value)
                console.log("-----------")
            })
            $.ajax({
                url: `${backURL}/upload`,
                method: 'post',
                contentType: false, //파일첨부용 프로퍼티
                processData : false, //파일첨부용 프로퍼티
                data : fd2, //"t=tValue&"
                success : (responseJSONObj)=>{
                    alert(responseJSONObj.msg)
                    if(responseJSONObj.status==1){
                        location.href='./main.html'
                    }
                },
                error : ()=>{}
            })
            return false //기본이벤트 막고, 이벤트 전파도 막음
        })
        //----파일업로드용 테스트 폼객체에서 submit이벤트 발생했을 때 할 일 END ----


        //----파일다운로드 테스트 버튼에서 클릭이벤트 발생했을때 할 일 sTART----
    $('div.download>button').click(()=>{
        const $img = $('div.download>img')
        $.ajax({
            xhrFields: {
                responseType: "blob",
            },
            url: `${backURL}/download`,
            data: 'id=test',
            success: (responseData)=>{
                const url = URL.createObjectURL(responseData)
                $img.attr('src', url)
            }
        })
        
    })
    //----파일다운로드 테스트 버튼에서 클릭이벤트 발생했을때 할 일 END----

    //----프로필 input객체에서 체인지이벤트 발생했을 때 할 일 START-----
    $('form.signup>div>label>input[name=f1]').change((e)=>{
        console.log(e.target.files[0])
        const url = URL.createObjectURL(e.target.files[0])
        $('form.signup>div>div>img.profile').attr('src',url)
    })
    //----프로필 input객체에서 체인지이벤트 발생했을 때 할 일 -----
    
    })