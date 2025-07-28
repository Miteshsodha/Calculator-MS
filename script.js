let expr = document.querySelector("#expression");
let plus = document.querySelector(".plus");
let sub = document.querySelector(".sub");
let mul = document.querySelector(".mul");
let divss = document.querySelector(".div");
let final = document.querySelector("#final");
let value = document.querySelector("#value");
let sign = document.querySelector(".sign");
let d = '';
let e = '';
let f = '';


function calculate(a, b, c) {

    a = Number(a);


    c = Number(c);


    if (b == "+") {
        add(a, c)

    }

    if (b == "-") {
        subtract(a, c)
    }

    if (b == "*") {
        multiply(a, c)
    }

    if (b == "/") {
        devide(a, c)
    }

}

function add(a, c) {
    value.textContent = Number.isInteger(a + c) ? (a + c) : parseFloat((a + c).toFixed(1));
}

function subtract(a, c) {
    value.textContent = Number.isInteger(a - c) ? (a - c) : parseFloat((a - c).toFixed(1));
}

function multiply(a, c) {
    value.textContent = Number.isInteger(a * c) ? (a * c) : parseFloat((a * c).toFixed(1));
}

function devide(a, c) {
    value.textContent = Number.isInteger(a / c) ? (a / c) : parseFloat((a / c).toFixed(1));
}


for (let i = 0; i < 11; i++) {
    let n = document.querySelector(`.num${i}`);

    n.addEventListener("click", () => {
        if (e == '') {



            d += n.textContent;
            expr.textContent = "";
            sign.addEventListener("click", () => {
                if (e == '') {

                    if (d > 0) {
                        d = 0 - d;

                    } else if (d < 0) {
                        d = d - 0;

                    }
                    expr.textContent = d;
                }
            })
            expr.textContent += d;
        }

    })

}

if (e != "") {

}



plus.addEventListener("click", () => {

    for (let i = 0; i < 11; i++) {
        let n = document.querySelector(`.num${i}`);

        n.addEventListener("click", () => {

            f += n.textContent;

            sign.addEventListener("click", () => {
                console.log("hh");

                if (f > 0) {
                    f = 0 - f;
                } else if (f < 0) {
                    f = f - 0;
                }
                expr.textContent = f;
            })

            expr.textContent = f;



        })

    }



    e += plus.textContent;
    expr.textContent += e;

})

sub.addEventListener("click", () => {

    for (let i = 0; i < 11; i++) {
        let n = document.querySelector(`.num${i}`);


        n.addEventListener("click", () => {

            f += n.textContent;

            sign.addEventListener("click", () => {
                console.log("hh");

                if (f > 0) {
                    f = 0 - f;
                } else if (f < 0) {
                    f = f - 0;
                }
                expr.textContent = f;
            })

            expr.textContent = f;



        })

    }

    e += sub.textContent;
    expr.textContent += e;

})

mul.addEventListener("click", () => {

    for (let i = 0; i < 11; i++) {
        let n = document.querySelector(`.num${i}`);

        n.addEventListener("click", () => {

            f += n.textContent;

            sign.addEventListener("click", () => {
                console.log("hh");

                if (f > 0) {
                    f = 0 - f;
                } else if (f < 0) {
                    f = f - 0;
                }
                expr.textContent = f;
            })

            expr.textContent = f;



        })

    }

    e += "*";

    expr.textContent += "×";


})

divss.addEventListener("click", () => {

    for (let i = 0; i < 11; i++) {
        let n = document.querySelector(`.num${i}`);


        n.addEventListener("click", () => {

            f += n.textContent;

            sign.addEventListener("click", () => {
                console.log("hh");

                if (f > 0) {
                    f = 0 - f;
                } else if (f < 0) {
                    f = f - 0;
                }
                expr.textContent = f;
            })

            expr.textContent = f;

        })
    }

    e += "/";
    expr.textContent += "÷";
})



final.addEventListener("click", () => {

    if (d != "" && e != "" && f != "") {
        calculate(d, e, f);
    }
})


document.querySelector(".B").addEventListener("click", () => {

    if (e == '') {
        d = d.slice(0, -1);
        expr.textContent = d;
    } else if (e != '') {
        f = f.slice(0, -1);
        expr.textContent = f;
    }

})

document.querySelector(".al").addEventListener("click", () => {
    alert("🤖: Its Just fancy Key 😉")
})

document.querySelector(".al1").addEventListener("click", () => {
    alert("🤖: another fancy key 🥲")
})

document.querySelector(".C").addEventListener("click", () => {
    d = '';
    e = '';
    f = '';
    expr.textContent = "Cleared...";
    value.textContent = "";
})