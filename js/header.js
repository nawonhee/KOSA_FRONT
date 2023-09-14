
function ajaxHandler(method, u, target) {
    console.log(u)

    // $.ajax({
    //     url: u,
    //     method: method,
    //     success: (responseText)=>{
    //         target.html(responseText)
    //     },
    //     error: ()=>{
    //         alert('응답실패')
    //     }
    // })
    if (method == 'GET') {
        target.load(u, function (response, status, xhr) {
            if (status == "error") {
                alert(xhr.status + xhr.statusText)
            }
        })
    }
}


//$(document).ready()
$(() => {
    //DOM트리에서 section 객체 찾기
    const sectionObj = document.querySelector('section')
    const $sectionObj = $('section')

    console.log("---자바스크립트 객체---")
    console.log(sectionObj)

    console.log("---jQuery 객체---")
    console.log($sectionObj)
    console.log(sectionObj === $sectionObj)
    console.log(sectionObj === $sectionObj.get(0))

    //DOM트리에서 nav>ul>li>a객체들 찾기
    const menus = document.querySelectorAll('nav>ul>li>a')
    const $menus = $('nav>ul>li>a')


    $menus.click((e) => {
        //alert('메뉴클릭됨')
        console.log(e.target.className)
        //menu
        switch (e.target.className) {
            case 'login':
                ajaxHandler('GET', "./login.html", $sectionObj)
                break
            case 'signup':
                ajaxHandler('GET', './signup.html', $sectionObj)
                break
            case 'logout': break
            case 'productlist':
                ajaxHandler('GET', './productlist.html', $sectionObj)
                //ajaxHandler('GET','http://localhost:8888/back/productlistjson', $sectionObj)
                break
            case 'cartlist': break
            case 'orderlist': break

        }
        e.preventDefault()
    })
    //---로고 img 객체에서 클릭이벤트가 발생했을 때 할 일 start---
    $('header>img').click((e) => {
        location.href = './main.html'
    })
    //---로고 img 객체에서 클릭이벤트가 발생했을 때 할 일 start---
})
