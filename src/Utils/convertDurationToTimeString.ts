export function convertDurationToTimeString(duration:number){
    const hours = Math.floor(duration/3600); // 60*60 = 3600
    const minutes = Math.floor((duration%3600)/60);
    const seconds = duration % 60;

    const timeFormated = [hours,minutes,seconds].map(x=>String(x).padStart(2,'0')).join(':')

    return timeFormated;
}