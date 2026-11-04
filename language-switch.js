document.querySelectorAll('.language-switch a').forEach(link=>{
  link.addEventListener('click',()=>{
    const target=new URL(link.href,location.href);
    if(location.hash)target.hash=location.hash;
    link.href=target.href;
  });
});
