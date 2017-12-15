function flower() {

  var s = Snap("#svg");
  // Lets create big circle in the middle:
  var flowerStalk = s.path("M200 200 q 0 -100 -40 -120");

  flowerStalk.attr({
    strokeWidth: 10,
    stroke: "#fff",
    strokeLinecap: "round"
  });


  // Flower head



  class Leaf {
    constructor(s, direction) {
      this.d = (direction === "left") ? -1 : 1;
      this.leaf = s.path("M200 150 c" + 100 * this.d + ",-40 " + this.d * 100 + ",40 0,0")
        .attr({ stroke: "#fff", fill: "transparent", strokeWidth: 4 })
        .transform("r-10");
    }

    startAnimation() {
      this.leaf.animate({ d: "M200 150 c" + 100 * this.d + ",-60 " + this.d * 100 + ",20 0,0" },
        3000,
        mina.easeinout,
        this.reverseAnimation.bind(this));
    }

    reverseAnimation() {
      this.leaf.animate({ d: "M200 150 c" + 100 * this.d + ",-40 " + this.d * 100 + ",40 0,0" },
        3000,
        mina.bounce,
        this.startAnimation.bind(this));
    }
  }

  class Head {
    constructor(s) {
      this.head = s.group(s.circle(24, 24, 25).attr({ fill: "#fff" }),
        s.circle(19, 0, 24).attr({ fill: "#fff" }),
        s.circle(0, 14, 24).attr({ fill: "#fff" }),
        s.circle(38, 14, 24).attr({ fill: "#fff" }),
        s.circle(7, 36.5, 24).attr({ fill: "#fff" }),
        s.circle(31, 36.5, 24).attr({ fill: "#fff" }),
        s.circle(22, 22, 8).attr({ fill: "#000" }));
      this.head.transform("T125 55");
    }

    startAnimation() {
      this.head.animate({ transform: this.head.transform() + "t100 0 r360" },
        5000,
        mina.easeinout,
        this.reverseAnimation.bind(this));
    }

    reverseAnimation() {
      this.head.animate({ transform: this.head.transform() + "t-100 0 r360" },
        5000,
        mina.easeinout,
        this.startAnimation.bind(this));
    }


  }

  let l = new Leaf(s, "left");
  l.startAnimation();

  let l2 = new Leaf(s);
  l2.startAnimation();


  function reverseStalkAnimation() {
    flowerStalk.animate({ d: "M200 200 q 0 -100 -40 -120" },
      5000,
      mina.easeinout,
      startStalkAnimation);
  };

  function startStalkAnimation() {
    flowerStalk.animate({ d: "M200 200 q 0 -100 40 -120" },
      5000,
      mina.easeinout,
      reverseStalkAnimation);
  };



  startStalkAnimation();

  let h = new Head(s);
  h.startAnimation();


};
