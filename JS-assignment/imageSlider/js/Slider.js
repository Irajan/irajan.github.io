function ImageSlider(domElement, transitionTime, holdTime) {
	this.domElement = domElement;
	this.renderer = domElement.children[0];
	this.transitionTime = transitionTime || TRANSITION_TIME;
	this.holdTime = holdTime || HOLD_TIME;

	this.imageCount = this.renderer.children.length;

	this.currentIndex = 0;
	this.currentPosition = 0;
	this.transition = false;

	this.indicatorWrapper = document.createElement('div');
	this.indicatorWrapper.classList.add('slide-index-indicator');

	/**
	 * Function to perform sliding animation
	 * @param {currentIndex} index value of current image
	 * @param { destinationIndex} index value of image after slide
	 */
	this.slide = function (currentIndex, destinationIndex) {
		const diff = destinationIndex - currentIndex;
		const slidingWidth = diff * (IMAGE_WIDTH + 20);
		const pxPerMS = slidingWidth / this.transitionTime;

		const targetPosition = this.currentPosition - slidingWidth;
		let left = this.currentPosition;

		clearInterval(this.interval);
		const interval = setInterval(() => {
			this.transition = true;

			left -= pxPerMS;

			this.renderer.style.transform = 'translateX(' + Math.round(left) + 'px)';

			if (diff * left < diff * targetPosition) {
				this.currentIndex = destinationIndex;
				this.currentPosition = targetPosition;
				this.transition = false;
				clearInterval(interval);
				this.updateIndicator();
				setTimeout(() => {
					this.interval = this.requestInterval();
				}, this.holdTime * 2);
			}
		}, 1);
	};

	/**
	 *Update indicator buttons on
	 */
	this.updateIndicator = function () {
		const indicators = this.indicatorWrapper.children;

		for (let i = 0; i < indicators.length; i++)
			if (this.currentIndex == i) indicators[i].disabled = true;
			else indicators[i].disabled = false;
	};

	/**
	 * initialize some properties and add some elements on DOM
	 */
	this.init = function () {
		this.domElement.style.width = IMAGE_WIDTH + 'px';
		this.renderer.style.width = (IMAGE_WIDTH + 20) * this.imageCount + 'px';

		for (let i = 0; i < this.imageCount; i++) {
			const indicator = document.createElement('button');
			indicator.classList.add('btn-indicator');

			this.indicatorWrapper.appendChild(indicator);

			indicator.addEventListener('click', () => {
				if (!this.transition) {
					this.slide(this.currentIndex, i);
				}
			});
		}

		const nextBtn = document.createElement('button');
		nextBtn.classList.add('carousel-next');
		nextBtn.innerHTML = '>';

		const prevBtn = document.createElement('button');
		prevBtn.classList.add('carousel-prev');
		prevBtn.innerHTML = '<';

		nextBtn.addEventListener('click', () => {
			if (!this.transition && this.currentIndex != this.imageCount - 1)
				this.slide(this.currentIndex, this.currentIndex + 1, -1);
		});

		prevBtn.addEventListener('click', () => {
			if (!this.transition && this.currentIndex != 0)
				this.slide(this.currentIndex, this.currentIndex - 1, 1);
		});

		this.domElement.appendChild(nextBtn);
		this.domElement.appendChild(prevBtn);
		this.domElement.appendChild(this.indicatorWrapper);
	};

	this.interval = (requestInterval = () => {
		return setInterval(() => {
			const nextIndex = (this.currentIndex + 1) % this.imageCount;
			this.slide(this.currentIndex, nextIndex);
		}, this.holdTime);
	})();

	this.interval = this.init();
}
