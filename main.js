const uploadButton = document.getElementById('uploadButton')
const fileInput = document.getElementById('fileInput')
const imageShow =  document.getElementById("imageShow")
const shapeSelector = document.getElementById('shapeSelector')
const applyShapes = document.getElementById('apply-shapes')
const downloadBtn = document.getElementById('download')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const resetBtn = document.getElementById('reset')




let currentImage = null;
let currentImageURL = null; 


const uploadImage = (e) => {
    fileInput.click()
}

function readImageFile() {
  
   if(this.files && this.files.length > 0){
    const file = this.files[0]
    const reader = new FileReader()
     reader.onload = function(e) {
       
        imageShow.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" class="uploaded-img">`
        currentImage = imageShow.querySelector('img');
        currentImage.style.width = '250px'
         currentImage.style.height = '220px'
        
      
     }
    reader.readAsDataURL(file)
   
   }else{
    imageShow.innerHTML = '<span>No image selected</span>'
    currentImage = null;
    
   }
   
   
    
}
function changeShapes(e) {
    if(currentImage){
       const shapeSelectors = shapeSelector.value;
       currentImage.className = shapeSelectors
     
       
    }else {
        alert('Please upload an image first!');
      }
    
}

function downloadImage(){
   
       ctx.clearRect(0,0,canvas.width,canvas.height)
       const style = getComputedStyle(currentImage)
       const clipPath = style.clipPath;

       ctx.save();
        
    if(clipPath.includes('circle')){
        const radius = canvas.width/2;
        ctx.beginPath();
        ctx.arc(radius,radius,radius,0,Math.PI * 2)
        ctx.clip()

    }else if(clipPath.includes('polygon')){
        ctx.beginPath();
       ctx.moveTo(canvas.width / 2,0)
       ctx.lineTo(0, canvas.height)
       ctx.lineTo(canvas.width, canvas.height);
       ctx.closePath();
      ctx.clip();
        
    }else if(clipPath.includes('ellipse')){
        const centerX = canvas.width/2;
        const centerY = canvas.height / 2;

        const radiusX = canvas.width * 0.25;
        const radiusY = canvas.height * 0.4;
        ctx.beginPath();
        ctx.ellipse(centerX,centerY,radiusX,radiusY,0,0,2 * Math.PI)
        ctx.closePath();
        ctx.clip();

    }else{
        
    }

    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
      ctx.restore();

      const link = document.createElement('a')
      link.download = 'transformed-image.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
}

function resetImage(){
   imageShow.innerText = 'Upload Image'
}
fileInput.addEventListener("change",readImageFile)
uploadButton.addEventListener("click",uploadImage)
applyShapes.addEventListener("click",changeShapes)
downloadBtn.addEventListener("click",downloadImage)
resetBtn.addEventListener("click",resetImage)
