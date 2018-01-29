        // making a request from the client to the server to open up a webscoket,
        // and keep the connection open
        let socket = io(),
        currentNumberOfVisitors = 0,
        visitorsCounter = document.createElement('div');

        visitorsCounter.className = 'visitorsCount';

        socket.on('connect', () => {
            console.log('connected to server');
            createNumberElement();
            appendFirst(document.getElementById("visitors").getElementsByClassName("container")[0], visitorsCounter);
        });

        //like when the server is down
        socket.on('disconnect', () => {
            console.log('disconnected from server')
        });

        socket.on('newVisitor', (visitorsCounter) => {
            console.log('newVisitor', visitorsCounter);
            setVisitorsCount(visitorsCounter);
        });

         socket.on('newAnonymous', ({ visitorsCounter: visitorsCounter, createdAt: createdAt}) => {
            console.log(`newAnonymous at: ${ createdAt }`);
            setVisitorsCount(visitorsCounter);
        });


        function keepMeAnonymous() {
            socket.emit('anonymousRequest');
            document.getElementById("anonymousButton").disabled = true;
        }

        function createNumberElement() {
                let wrapper = document.createElement('div');
                wrapper.className = 'wrapper';
                wrapper.setAttribute('data-num', '0');

                for (let j = 9; j >= 0; j--) {
                    let number = document.createElement('div'),
                    top = document.createElement('div'),
                    bottom = document.createElement('div'),
                    bottomContent = document.createElement('div');

                    number.className = `n${j}`;
                    top.className = 'top';
                    top.innerHTML = j;

                    bottom.className = 'bottom';
                    bottom.appendChild(bottomContent);
                    bottomContent.innerHTML = j;

                    number.appendChild(top);
                    number.appendChild(bottom);

                    wrapper.appendChild(number);
                }

                appendFirst(visitorsCounter, wrapper);
        }

        function setVisitorsCount(visitors) {
            let digitsArray = visitors.toString().split('');

            if (digitsArray.length > currentNumberOfVisitors.toString().split('').length) {
                for (let i = 0; i < (digitsArray.length - currentNumberOfVisitors.toString().split('').length); i++) {
                createNumberElement();
            }
        }
        Array.from(visitorsCounter.children).forEach((element, index) => {
            element.setAttribute('data-num', digitsArray[index]);
        });
        currentNumberOfVisitors = visitors;
    }

    function getGeoLocation() {
        //function that activly get the cordinates of the user, first argument is sucess handler and the second is error handler
        navigator.geolocation.getCurrentPosition((position) => {

        })
    }

    function appendFirst(container, elementToAppend) {
        container.insertBefore(elementToAppend, container.firstChild);
    }