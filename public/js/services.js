const container = document.querySelectorAll(".box-cont");

container.forEach((element) => {
  element.addEventListener("mouseenter", function(event) {
    const element = event.target.querySelector(".box");
    const coords = getCoords(event.target.getBoundingClientRect());
    const radius = circleSize(event.target.getBoundingClientRect(), coords)

    circleConstraints(element, coords, radius)
    animation(element)
  });

  element.addEventListener("mouseleave", function(event) {
    const element = event.target.querySelector(".box");
    animationLeave(element);
  });
});

function animation(element) {
  const transform = [
    "scale(0)",
    "scale(1)"
  ];
  const options = {
    duration: 600,
    fill: "forwards",
    easing: "cubic-bezier(.2, 1, .2, 1)",
    iterations: 1
  };
  element.animate({transform}, options);
};

function animationLeave(element) {
  const transform = [
    "scale(1)",
    "scale(0)"
  ];
  const options = {
    duration: 400,
    fill: "forwards",
    easing: "cubic-bezier(.2, 1, .2, 1)",
    iterations: 1
  };
  element.animate({transform}, options);
};

function getCoords(rectangle) {
  return {
    x: rectangle.width * Math.random(),
    y: rectangle.height * Math.random(),
  }
};

function circleSize(rectangle, coords) {
  const x1 = coords.x;
  const y1 = coords.y;
  const rectCoords = [
    { x: 0, y: 0 },
    { x: 0, y: rectangle.height },
    { x: rectangle.width, y: 0 },
    { x: rectangle.width, y: rectangle.height }
  ];

  return Math.max(...rectCoords.map((el) => {
    const x2 = el.x;
    const y2 = el.y;
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
  }));
}

function circleConstraints(element, coords, radius) {
  element.style.height = radius * 2 + 'px';
  element.style.width = radius * 2 + 'px';
  element.style.top = coords.y - radius + 'px';
  element.style.left = coords.x - radius + 'px';
}
