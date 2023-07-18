document.addEventListener("DOMContentLoaded", function () {
    const imageCards = document.querySelectorAll(".image-card");
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    document.body.appendChild(lightbox);

    imageCards.forEach(function (card) {
        card.addEventListener("click", function () {
            const img = document.createElement("img");
            img.src = this.querySelector("img").src;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
            lightbox.classList.add("open");
        });
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove("open");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star");
    const ratingValue = document.getElementById("rating-value");

    stars.forEach(function (star) {
        star.addEventListener("mouseover", function () {
            const rating = this.getAttribute("data-rating");
            highlightStars(rating);
        });

        star.addEventListener("mouseout", function () {
            const selectedRating = ratingValue.value;
            highlightStars(selectedRating);
        });

        star.addEventListener("click", function () {
            const rating = this.getAttribute("data-rating");
            ratingValue.value = rating;
        });
    });

    function highlightStars(rating) {
        stars.forEach(function (star) {
            if (star.getAttribute("data-rating") <= rating) {
                star.classList.add("highlight");
            } else {
                star.classList.remove("highlight");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("review-form");
    const ratingValue = document.getElementById("rating-value");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const reviewRating = ratingValue.value;
        const reviewText = document.getElementById("review-text").value;

        // Send the review data to the server-side script
        fetch("/submit-review.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rating: reviewRating,
                review: reviewText
            })
        })
            .then(function (response) {
                if (response.ok) {
                    // Review submission successful
                    console.log("Review submitted successfully");
                    form.reset();
                } else {
                    // Review submission failed
                    console.log("Failed to submit review");
                }
            })
            .catch(function (error) {
                console.log("Error submitting review:", error);
            });
    });

});

