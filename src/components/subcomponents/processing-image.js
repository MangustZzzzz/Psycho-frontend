import React, { useEffect, useRef } from "react";
import { useState } from "react";

import imgMain from "../../assets/blanks/main.png";
import imgSecond from "../../assets/blanks/3.png";

function HandlerImage() {
  const [OpenCVisMount, SetOpenCVisMount] = useState(false);
  const [imageState, setImageState] = useState("");

  const canvasRef = useRef(null);

  const image_A_elementRef = useRef(null);
  const image_B_elementRef = useRef(null);

  const CANVASimage_A_elementRef = useRef(null);
  const CANVASimage_B_elementRef = useRef(null);

  const aligned_image_canvas_ref = useRef(null);
  const fragment_canvas_ref = useRef(null);
  const fragment_canvas_ref2 = useRef(null);

  useEffect(() => {
    if (OpenCVisMount) {
      return;
    }
    const connectionLib = async () => {
      await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "./opencv.js";
        script.async = true;
        script.crossOrigin = "anonymous";
        script.onload = resolve;
        document.body.appendChild(script);
      });
      SetOpenCVisMount(true);
    };
    connectionLib();
  }, []);

  const handlerInputFile = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
      setImageState(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handlerInputImg = (event) => {
    const image_A_element = image_A_elementRef.current; //image_A_elementRef.current;
    const image_B_element = image_B_elementRef.current;

    const cv = window.cv;
    let im2 = cv.imread(image_A_element);
    let im1 = cv.imread(image_B_element);
    console.log("im2", im2);
    console.log("im1", im1);

    let im1Gray = new cv.Mat();
    let im2Gray = new cv.Mat();
    cv.cvtColor(im1, im1Gray, cv.COLOR_BGRA2GRAY);
    cv.cvtColor(im2, im2Gray, cv.COLOR_BGRA2GRAY);

    let keypoints1 = new cv.KeyPointVector();
    let keypoints2 = new cv.KeyPointVector();
    let descriptors1 = new cv.Mat();
    let descriptors2 = new cv.Mat();

    var orb = new cv.AKAZE();
    //const orb = new cv.ORB(200000);
    orb.detectAndCompute(im1Gray, new cv.Mat(), keypoints1, descriptors1);
    orb.detectAndCompute(im2Gray, new cv.Mat(), keypoints2, descriptors2);

    let good_matches = new cv.DMatchVector();

    let bf = new cv.BFMatcher();
    let matches = new cv.DMatchVectorVector();

    bf.knnMatch(descriptors1, descriptors2, matches, 15);

    for (let i = 0; i < matches.size(); ++i) {
      let match = matches.get(i);

      let dMatch1 = match.get(0);
      let dMatch2 = match.get(1);
      //console.log("[", i, "] ", "dMatch1: ", dMatch1, "dMatch2: ", dMatch2);
      const COEFF = 0.72;
      if (dMatch1.distance <= dMatch2.distance * COEFF) {
        //console.log("***Good Match***", "dMatch1.distance: ", dMatch1.distance, "was less than or = to: ", "dMatch2.distance * parseFloat(knnDistance_option)", dMatch2.distance * parseFloat(knnDistance_option), "dMatch2.distance: ", dMatch2.distance, "knnDistance", knnDistance_option);
        good_matches.push_back(dMatch1);
      }
    }

    let imMatches = new cv.Mat();
    let color = new cv.Scalar(0, 255, 0, 255);
    cv.drawMatches(im1, keypoints1, im2, keypoints2, good_matches, imMatches, color);
    //cv.imshow("imageCompareMatches", imMatches); отображение связей

    let keypoints1_img = new cv.Mat();
    let keypoints2_img = new cv.Mat();
    let keypointcolor = new cv.Scalar(0, 255, 0, 255);
    cv.drawKeypoints(im1Gray, keypoints1, keypoints1_img, keypointcolor);
    cv.drawKeypoints(im2Gray, keypoints2, keypoints2_img, keypointcolor);

    // cv.imshow("keypoints1", keypoints1_img); отображение точек
    //cv.imshow("keypoints2", keypoints2_img); отображение точек

    let points1 = [];
    let points2 = [];
    for (let i = 0; i < good_matches.size(); i++) {
      points1.push(keypoints1.get(good_matches.get(i).queryIdx).pt.x);
      points1.push(keypoints1.get(good_matches.get(i).queryIdx).pt.y);
      points2.push(keypoints2.get(good_matches.get(i).trainIdx).pt.x);
      points2.push(keypoints2.get(good_matches.get(i).trainIdx).pt.y);
    }
    console.log("points1:", points1, "points2:", points2);

    var mat1 = new cv.Mat(points1.length, 1, cv.CV_32FC2);
    mat1.data32F.set(points1);
    var mat2 = new cv.Mat(points2.length, 1, cv.CV_32FC2);
    mat2.data32F.set(points2);

    let h = cv.findHomography(mat1, mat2, cv.RANSAC);

    // if (h.empty()) {
    //   alert("homography matrix empty!");
    //   return;
    // } else {
    //   console.log("h:", h);
    //   console.log("[", h.data64F[0], ",", h.data64F[1], ",", h.data64F[2]);
    //   console.log("", h.data64F[3], ",", h.data64F[4], ",", h.data64F[5]);
    //   console.log("", h.data64F[6], ",", h.data64F[7], ",", h.data64F[8], "]");
    // }

    let image_B_final_result = new cv.Mat();
    cv.warpPerspective(im1, image_B_final_result, h, im2.size());

    cv.imshow("imageAligned", image_B_final_result);
    console.log(image_B_element);
  };

  const sourceCanvas = aligned_image_canvas_ref.current;
  const fragmentCanvas = fragment_canvas_ref.current;
  const fragmentCanvas2 = fragment_canvas_ref2.current;

  const [imgArr, setImgArr] = useState([]);
  const [count, setCount] = useState(0);

  const img_fragmentation = () => {
    console.log(fragmentCanvas);
    // Получаем контексты рисования для обоих canvas
    let sourceContext = sourceCanvas.getContext("2d");
    let targetContext = fragmentCanvas.getContext("2d");
    let targetContext2 = fragmentCanvas2.getContext("2d");
    // Определяем размеры и местоположение области, которую мы хотим скопировать
    let sourceX = 137; // начальная координата X
    let sourceY = 230; // начальная координата Y
    let sourceWidth = 45; // ширина области
    let sourceHeight = 36; // высота области

    // Определяем место, где мы хотим вставить скопированную область
    let targetX = 0; // начальная координата X
    let targetY = 0; // начальная координата Y

    // Копируем область изображения из sourceCanvas в targetCanvas
    for (let i = 0; i < 6; i++) {
      let X = sourceX + sourceWidth * 2 * i + i * 4;
      for (let j = 0; j < 20; j++) {
        let Y = sourceY + sourceHeight * j * 0.88;

        targetContext.drawImage(sourceCanvas, X, Y, sourceWidth, sourceHeight, targetX, targetY, sourceWidth, sourceHeight);
        let img = new Image();
        img.src = fragmentCanvas.toDataURL();
        imgArr.push(img);
        setImgArr([...imgArr]);
      }
    }

    //targetContext2.drawImage(imgArr[1], 0, 0);

    console.log(imgArr);
  };

  const swapFragment = (a) => {
    let targetContext2 = fragmentCanvas2.getContext("2d");
    if (a) {
      setCount(count + 1);
    }
    if (!a) {
      setCount(count - 1);
    }

    targetContext2.drawImage(imgArr[count], 0, 0);
  };

  return (
    <div>
      {OpenCVisMount ? (
        <>
          <img style={{ width: "900px", opacity: "0", position: "absolute", top: "-9999px", zIndex: "-9999" }} ref={image_B_elementRef} src={imageState} />

          <input type="file" onChange={handlerInputFile} />
          <button onClick={handlerInputImg}>Go</button>
          <button onClick={img_fragmentation}>Cut</button>
          <button onClick={() => swapFragment(true)}>Next</button>
          <button onClick={() => swapFragment(false)}>Back</button>

          <h2>Result</h2>
          <canvas style={{ width: "300px" }} ref={aligned_image_canvas_ref} id="imageAligned"></canvas>

          <canvas style={{ position: "absolute", opacity: "0" }} ref={fragment_canvas_ref} id="fragment_canvas"></canvas>
          <canvas style={{ position: "absolute", opacity: "0" }} ref={fragment_canvas_ref2} id="fragment_canvas2"></canvas>

          <img style={{ width: "748px", opacity: "0", position: "absolute", top: "-9999px", zIndex: "-9999" }} ref={image_A_elementRef} src={imgMain} />

          {/*<canvas id="imageCompareMatches"></canvas>
          <br />
          <h2>keypoints1</h2>
          <canvas id="keypoints1"></canvas>
          <br />
          <h2>keypoints2</h2>
          <canvas id="keypoints2"></canvas>
      <br />*/}
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
}

export default HandlerImage;
