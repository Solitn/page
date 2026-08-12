const bio = ["kubegaozhongsheng",
    "Cry now Cry now Cry now"
];
const name = "Solitn";
init();
function typeWriter(i,text, speed, area) {
    let typeWriterArea = document.getElementById(area);
    if (typeWriterArea) {
        if(i < text.length) {
            typeWriterArea.innerHTML += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(i, text, speed, area), speed);
        }
    }
}
function init(){
    typeWriter(0,bio[Math.floor(Math.random() * bio.length)], 50, "page1_bio");
    typeWriter(0,name, 100, "page1_name");
}
