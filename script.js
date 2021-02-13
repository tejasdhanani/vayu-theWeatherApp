var WeatherApp = () => {
    const form = document.getElementById('form');
    const inputValue = document.querySelector('.inputValue');
    const city = document.getElementById('city');
    const temp = document.getElementById('temp');
    const desc = document.getElementById('desc');
    const riTitle = document.querySelector('.related-img-title');
    const img = document.getElementById('img');
    const submitBtn = document.getElementById('submitquerybtn');
    const reloadBtn = document.querySelector('.reloadbtn');
    const spanreloadBtn = document.getElementById('span-reloadbtn');

    const imageAPI = '20221255-4fd10e73bf7816559ad9b32a2';
    const weatherAPI = '19c05fbb1c55011c2cd9340b437df9dd';

    var getImage = () => {
        fetch('https://pixabay.com/api/?key='+imageAPI+'&q='+inputValue.value+'&image_type=photo&pretty=true')
        .then(response => response.json())
        .then(imgdata => {
            
            function showImage() {
                var hitsArrayLength = imgdata['hits'].length; 
                var selectRandomImg = Math.floor(Math.random() * hitsArrayLength);

                var imgURL = imgdata['hits'][selectRandomImg]['webformatURL'];

                riTitle.style.display = 'block';
                riTitle.style.color = 'black';
                riTitle.textContent = 'Related Image: ';
                img.style.display = 'block';
                spanreloadBtn.style.display = "block";
                img.src = imgURL;
            }

            showImage(); 

            reloadBtn.addEventListener('click', showImage);

            
            
        })
        .catch( () => {
            riTitle.style.display = 'block';
            riTitle.style.color = '#ec4646';
            riTitle.textContent = 'Sorry! No image available.';
            spanreloadBtn.style.display = 'none';
            img.style.display = 'none';
        });
    };
 
    var getWeather = () => {

        function getWeatherData() {
            fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value.replace(/\s/g,'')+'&appid='+weatherAPI+'&units=metric')
            .then(response => response.json())
            .then(data => {
                var nameValue = data['name'];
                var tempValue = data['main']['temp'];
                var descValue = data['weather'][0]['description'];

                city.innerHTML = nameValue;
                temp.innerHTML = Math.floor(tempValue) + ' °C';
                desc.innerHTML = descValue;
                getImage();
            })
            .catch(err => alert("You might have entered the wrong city!"));
        }

        form.addEventListener('focusout', (e) => {
            e.preventDefault();
            getWeatherData();
        });
            
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            getWeatherData();
        })
        
        
    };

    getWeather();

}

WeatherApp();


