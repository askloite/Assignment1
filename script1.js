console.log('Testing testing')


function toNOK(number) { //Makes a number to this format: kr 200,00

    return (new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(number))
}


let balance = 0  //Different numeric variables
let pay = 0
let loan = 0
let price = 0
let youHaveALoan = 0

const elbalance = document.getElementById("balance") //pretty self explanatory
const elpay = document.getElementById("pay")
const elloan = document.getElementById("loan")
const elloan2 = document.getElementById("loan2")
const elprice = document.getElementById("pris-pc")
const picture = document.getElementById("picture")
const elpc = document.getElementById("pc-tekst")
const elspec = document.getElementById("pc-tekst2")
const elfeature = document.getElementById("List-feature")

function isLoanTrue(num){ //function that removes loan things if there is no loan, and oposite
    if (num == 1) {

        button5.style.display = 'block'
        elloan.innerHTML = toNOK(loan)
        elloan2.innerHTML = "Loan"

    } else {
        button5.style.display = 'none'
        elloan.innerHTML = ""
        elloan2.innerHTML = ""
    }
}



const button1 = document.getElementById("button1") // pretty self explanatory
const button2 = document.getElementById("button2")
const button3 = document.getElementById("button3")
const button4 = document.getElementById("button4")
const button5 = document.getElementById("button5")

const select = document.getElementById("options")

button1.addEventListener('click', buttonfunc1)
button2.addEventListener('click', buttonfunc2)
button3.addEventListener('click', buttonfunc3)
button4.addEventListener('click', buttonfunc4)
button5.addEventListener('click', buttonfunc5)

select.addEventListener('change', selectfunc)

//Some running before things

button5.style.display = 'none'


async function fetchAPI() { //fetches the info for each laptop
    try {
        const response = await fetch("https://hickory-quilled-actress.glitch.me/computers")
        //console.log(await response.json())
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

const dataDetails = await fetchAPI()


const addLaptopsToOption = (laptops) => {  //creates the laptop options thing
    laptops.forEach(x => addLaptop(x))
}

const addLaptop = (laptop) => {
    const laptopElement = document.createElement("option")
    laptopElement.value = laptop.id
    laptopElement.appendChild(document.createTextNode(laptop.title))
    select.appendChild(laptopElement)
}

addLaptopsToOption(dataDetails)

selectfunc() // run this to load in the info so the page isnt blank at the start

function selectfunc() { //function that changes everything when a new laptop is selected

    console.log(select.value)

    const selectedLaptop = dataDetails[select.selectedIndex]
    console.log(select.target)
    elprice.innerHTML = toNOK(selectedLaptop.price)
    price = selectedLaptop.price
    
    if (select.value == 5){
        let word = "https://hickory-quilled-actress.glitch.me/"
        word+= selectedLaptop.image.substring(0,16)
        word+= "png"
        picture.src = word

    } else {
        picture.src = "https://hickory-quilled-actress.glitch.me/" + selectedLaptop.image

    }
    
    

    elpc.innerHTML = selectedLaptop.title

    let specs = ""
    for (const sentences of selectedLaptop.specs) {
        specs += "-"+ sentences + "<br>" 
    }

    elspec.innerHTML = specs

    elfeature.innerHTML = "<br>"+selectedLaptop.description



}


function buttonfunc1() { //instructions for the get a loan button

    console.log("button1 is pressed")

    let max_loan = 2*balance

    if ( youHaveALoan == 0 ){

    

        let buttonprompt1 = prompt("How much do you want to lend???   You can maximum lend " + toNOK(max_loan))

        if (Number(buttonprompt1) <= max_loan && Number(buttonprompt1) > 0) {

            balance = Number(buttonprompt1)+balance
            elbalance.innerHTML = toNOK(balance)

            loan = Number(buttonprompt1)

            youHaveALoan = 1
            isLoanTrue(1)



        } else {
            
            alert("ffs!");

        }


    }else {
        let buttonprompt1 = prompt("You have a loan! Is that understood?")

        if (buttonprompt1.toLowerCase() != "no") {
            alert("Nice!");
        } else {
            alert("ffs!")
        }
    }

    if (loan<=0){
        balance -= loan
        elbalance.innerHTML = toNOK(balance)
        loan = 0
        youHaveALoan = 0
        isLoanTrue(0)

    }

}


function buttonfunc3() {  //instructions for the work button

    console.log("button2 is pressed")

    pay+=100

    elpay.innerHTML = toNOK(pay)



}

function buttonfunc2() { //instructions for the bank button

    console.log("button3 is pressed")

    

    if ( youHaveALoan == 0 ){

        balance += pay
        pay = 0
        elpay.innerHTML = toNOK(pay)
        elbalance.innerHTML = toNOK(balance)


    }else {

        loan -= pay*0.1
        balance += pay*0.9
        pay = 0
        elpay.innerHTML = toNOK(pay)
        elbalance.innerHTML = toNOK(balance)
        elloan.innerHTML = toNOK(loan)

    }

    if (loan<=0){
        balance -= loan
        youHaveALoan = 0
        isLoanTrue(0)

    }

}

function buttonfunc5() { //instructions for the pay back loan button

    console.log("button5 is pressed")


    if ( loan <= pay ){

        pay -= loan
        loan = 0
        youHaveALoan = 0
        isLoanTrue(0)
        elpay.innerHTML = toNOK(pay)


    }else {

        let buttonprompt1 = prompt("You need to work more! Is that understood?")

        if (buttonprompt1.toLowerCase() != "no") {
            alert("Nice!");
        } else {
            alert("ffs!")
        }

    }


}




function buttonfunc4() { //instructions for the buy now button

    console.log("button4 is pressed")


    if ( price <= balance ){

        balance -= price

        elbalance.innerHTML = toNOK(balance)

        window.alert("You are now a proud owner of a new laptop!")



    }else {

        let buttonprompt1 = prompt("You need more balance! Is that understood?")

        if (buttonprompt1.toLowerCase() != "no") {
            alert("Nice!");
        } else {
            alert("ffs!")
        }

    }


}




























