
export function loadAllTab(){
  const tabs = document.querySelectorAll(".tab-header > li");
  const contents = document.querySelectorAll(".tab-content > div");
  if(tabs[0]){
    tabs[0].classList.add("current");
    contents[0].classList.add("current");
  }
  for(let i = 0; i < tabs.length; i++){
    tabs[i].addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("current"));
      contents.forEach(t => t.classList.remove("current"));
      tabs[i].classList.add("current");
      contents[i].classList.add("current");
    });
  }
}