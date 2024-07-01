import React from 'react';

export const Today = () => {

    const currentDate = new Date();
    const monthMap = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec",
    }
    const dayMap = {
        0: "Sunday",
        1: "Monday", 
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        // 7: "Sunday",
    }

    // console.log(currentDate);
    // console.log(monthMap);
    // console.log(dayMap[1])
    
    const currentYear = currentDate.getFullYear();
    const currentMonth = monthMap[currentDate.getMonth()];
    const todayDay = dayMap[currentDate.getDay()];
    const todayDate = currentDate.getDate();
    
    return (
        <div>
            <h2>{todayDay}, {currentMonth} {todayDate} {currentYear}</h2>
        </div>
    )

}

// class Today extends React.Component {
//     constructor(props) {
//         super(props);
        
//         this.state = {


            
//             // Today:(new Date()).toString(),
//             // Year:(new Date()).getFullYear(),
//             Month:monthMap[(new Date()).getMonth() + 1],
//             Day:(new Date()).getDay()
//         }
//     }

//     printDate() {

//     }

//     render() {

//         return (
//             <div>
//                 <h2>TUESDAY, {this.state.Month} {this.state.Day} {this.state.Year}</h2>
//             </div>
//         )
//     }
// }

// const Today = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth() + 1;
//     const day = today.getDate();
//     return (
//         <div>
//             <h2>TUESDAY, APRIL {day} {year}</h2>
//         </div>

//     );
// }

// export default Today