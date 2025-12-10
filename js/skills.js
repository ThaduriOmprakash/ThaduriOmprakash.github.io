/* ===================== SKILLS FLOAT – CONTROLLED MOVING AREA ===================== */

const bubbles = document.querySelectorAll(".skill-bubble");

// Bubble size matches CSS
const bubbleSize = 150;

// 🔥 Movement boundary (your new restriction area)
const moveWidth  = 900;  // max space bubble can travel horizontally
const moveHeight = 350;   // max space bubble can travel vertically

const repelStrength = 0.42;      // distance repulsion strength
const speed = 0.12;              // slower = smooth floating
let data = [];

/* ===================== INITIAL RANDOM POSITIONS ===================== */
bubbles.forEach(b => {

    // Random inside restricted area
    let x = Math.random() * (moveWidth  - bubbleSize);
    let y = Math.random() * (moveHeight - bubbleSize);

    let dx = (Math.random() * 0.5 + speed) * (Math.random()>0.5?1:-1);
    let dy = (Math.random() * 0.5 + speed) * (Math.random()>0.5?1:-1);

    data.push({ el:b, x,y, dx,dy });
});


/* ===================== ANIMATION LOOP ===================== */
function animate(){
    
    data.forEach(o => {
        o.x += o.dx;
        o.y += o.dy;

        /* Bounce inside NEW movement region */
        if(o.x <= 0 || o.x >= moveWidth  - bubbleSize) o.dx *= -1;
        if(o.y <= 0 || o.y >= moveHeight - bubbleSize) o.dy *= -1;

        /* Hard boundary - never escape */
        o.x = Math.max(0, Math.min(o.x, moveWidth  - bubbleSize));
        o.y = Math.max(0, Math.min(o.y, moveHeight - bubbleSize));

        /* No Overlapping */
        data.forEach(other=>{
            if(o!==other){
                let dx = o.x-other.x, dy=o.y-other.y;
                let dist = Math.hypot(dx,dy);

                if(dist < bubbleSize*0.95){
                    let angle=Math.atan2(dy,dx);
                    o.x+=Math.cos(angle)*repelStrength;
                    o.y+=Math.sin(angle)*repelStrength;
                }
            }
        });

        o.el.style.transform=`translate(${o.x}px,${o.y}px)`;
    });

    requestAnimationFrame(animate);
}

animate(); // start motion


/* ===================== 3D TILT — ICON ONLY ===================== */

bubbles.forEach(bubble=>{
    const icon=bubble.querySelector(".skill-icon");

    bubble.addEventListener("mousemove",e=>{
        const r=bubble.getBoundingClientRect();
        const x=e.clientX-r.left, y=e.clientY-r.top;

        const rotY=((x-r.width/2)/(r.width/2))*18;
        const rotX=((r.height/2-y)/(r.height/2))*18;

        icon.style.transform=`rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.25)`;
    });

    bubble.addEventListener("mouseleave",()=>{
        icon.style.transform="rotateX(0deg) rotateY(0deg) scale(1)";
    });
});
/* ===================== 📱 MOBILE + TABLET CONTROL ===================== */
/* We only override movement area when screen is small */

function updateMovementLimits() {
    if (window.innerWidth < 500) {
        // Very small phones
        moveWidth  = 260;
        moveHeight = 200;
    } 
    else if (window.innerWidth < 700) {
        // Normal phones
        moveWidth  = 350;
        moveHeight = 260;
    }
    else if (window.innerWidth < 900) {
        // Tablets
        moveWidth  = 550;
        moveHeight = 300;
    }
    else {
        // Default (your original request)
        moveWidth  = 900;
        moveHeight = 350;
    }
}

/* Run at start + on resize */
updateMovementLimits();
window.addEventListener("resize", updateMovementLimits);
