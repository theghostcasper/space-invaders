 let app = new Vue({
      el: '#app',
      data:{
        whiteDots: this.whiteDots,
        playNow: this.playNow,
        mouseX: this.mouseX || 600,
        mouseY: this.mouseY || 400,
        score: this.score,
        bullets: '',
        allBullets: []
      },
      methods:{
        onMouseMoved,
        shoot
      },
      mounted: function(){
        this.$nextTick(() => this.randomSpaceDots());
        window.addEventListener('keydown', (e) => {
          if(e.keyCode == 39){
            if(typeof right != "undefined")
              clearInterval(right) 
            right = setInterval(() =>  { this.mouseX += 10 }, 10);
          }
          if(e.keyCode == 37){
            if(typeof left != "undefined")

            clearInterval(left)           
            left = setInterval(() =>  { this.mouseX -= 10 },10); 
          }
          if(e.keyCode == 40){
            if(typeof down != "undefined")

            clearInterval(down)           

            down = setInterval(() => { this.mouseY +=10 },10); 
          }
          if(e.keyCode == 38){
            if(typeof up != "undefined")

            clearInterval(up)           

            up = setInterval(() =>  { this.mouseY -=10 },10); 
          }
          if(e.keyCode == 32){
            if(typeof boom != "undefined")

            clearInterval(boom)           

            boom = setInterval(() => { this.shoot() },80);  
          }
        });
        window.addEventListener('keyup', (e) => {
          if(e.keyCode == 39) 
            clearInterval(right)           
          if(e.keyCode == 37)
            clearInterval(left)           
          if(e.keyCode == 40)
            clearInterval(down)           
          if(e.keyCode == 38)
            clearInterval(up)           
          if(e.keyCode == 32)
            clearInterval(boom)           
        });
      }
    });
    app.randomSpaceDots = function randomDots(){
        let width = window.innerWidth; //get window width
        let height = window.innerHeight; //get window height

        this.whiteDots = '';
        for(let i=0;i<200;i++){
          setTimeout(()=>{
            let randomWidth = Math.floor(Math.random()*width); //getting a random value less than the width of the screen.
            let randomHeight = Math.floor(Math.random()*height); // getting a random value less than the height of the screen, excluding the header.
            let randomFont = Math.floor(Math.random()*40);

            this.whiteDots += `<span style="font-size:${randomFont}px; z-index:-${randomWidth}; display:inline-block; color:white; position:absolute; bottom:${randomHeight}px; right:${randomWidth}px; ">.</span>`;
            if(i == 20){
              this.playNow = true;
            }
          },i*10);
        }
        
        
    }
    function onMouseMoved(e){
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    }  
    function shoot(e){
      let x = this.mouseX;
      let y = this.mouseY;
      for(let i = 0;i<=y;i+=50){
          document.querySelector('.gun-shot').currentTime = 0;
          document.querySelector('.gun-shot').play()
        setTimeout(()=>{
          if(y-i < 50){
            this.bullets = ''
          }
          this.bullets =  `<span id=${i} style="font-size:50px; display:inline-block; color:white; position:absolute; top:${y - 100- i}px; left:${x +47}px; ">..</span>`;

        },i);
      }
      this.score = this.score == undefined? this.score=1: this.score+=1;
    }