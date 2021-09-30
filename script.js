const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //node list
const count = document.getElementById('count')
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;


//set data from localstorage and populate UI
populateUI = () => {

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    console.log(selectedSeats);

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}
populateUI()

//SaveSelectedMovieIndex And Price
setMovieData = (i,p) => {
    //localStorage.setItem(i,p)
    localStorage.setItem('selectedMovieIndex',i)
    localStorage.setItem('selectedMoviePrice',p)
}


//Movie Select Event
movieSelect.addEventListener('change',(e)=>{
    ticketPrice = +movieSelect.value
    setMovieData(e.target.selectedIndex,e.target.value);
    
    updateSelectedCount()
})


//update total and count
updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    //copy selected seats into arr
    //***********************************************ÇOK ÖNEMLİ */
    const seatIndex = [...selectedSeats].map((seat)=>{
        return [...seats].indexOf(seat)
    })

    localStorage.setItem('selectedSeats',JSON.stringify(seatIndex))

    const selectedSeatCount = selectedSeats.length;

    count.innerText = selectedSeatCount
    total.innerText = selectedSeatCount*ticketPrice
}


container.addEventListener('click',(e)=>{

    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
       
        e.target.classList.toggle('selected')

    }

    updateSelectedCount()
})


//Initial Count and Total 
//Eğer bu fonksiyonu tekrar çağırmazsak, sayfa yüklendiğinde bilet ücreti 0 görünüyor.
updateSelectedCount()