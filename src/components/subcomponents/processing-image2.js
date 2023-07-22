import React, { useEffect, useRef } from "react";
import { useState } from "react";

import imgMain from "../../assets/blanks/list.png";
import imgSecond from "../../assets/blanks/rotateList.png";

function HandlerImage() {
  const [OpenCVisMount, SetOpenCVisMount] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (OpenCVisMount) {
      return;
    }
    const connectionLib = async () => {
      await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://docs.opencv.org/4.5.1/opencv.js";
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });
      SetOpenCVisMount(true);
    };
    connectionLib();
  }, []);

  const handlerInputImg = (event) => {
    const cv = window.cv;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = imgMain;

    img.onload = async function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Получаем данные изображения в формате ImageData
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // Создаем матрицу изображения из данных ImageData
      const srcMat = cv.matFromImageData(imageData);
      // Создаем целевую матрицу для результата
      const dstMat = new cv.Mat();
      // Преобразуем цветовое пространство изображения
      cv.cvtColor(srcMat, dstMat, cv.COLOR_BGR2GRAY);
      // Отображаем результат на холсте
      cv.imshow(canvas, dstMat);
      const imageDataGray = ctx.getImageData(0, 0, canvas.width, canvas.height); // Данные для постобработки
      const imageDataGrayMat = cv.matFromImageData(imageDataGray);

      const img2 = new Image();
      img2.src = imgSecond;
      img2.onload = async function () {
        console.log(imgMain);
        ctx.drawImage(img2, 0, 0);
        const imageData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const srcMat2 = cv.matFromImageData(imageData2);
        const dstMat2 = new cv.Mat();
        cv.cvtColor(srcMat2, dstMat2, cv.COLOR_BGR2GRAY);
        cv.imshow(canvas, dstMat2);
        const imageDataGray2 = ctx.getImageData(0, 0, canvas.width, canvas.height); // Данные для постобработки
        const imageDataGrayMat2 = cv.matFromImageData(imageDataGray2);

        const resultMat = new cv.Mat();

        let keypoints1 = new cv.KeyPointVector();
        let keypoints2 = new cv.KeyPointVector();
        let descriptors1 = new cv.Mat();
        let descriptors2 = new cv.Mat();

        var orb = new cv.AKAZE();

        await orb.detectAndCompute(imageDataGrayMat, new cv.Mat(), keypoints1, descriptors1);
        await orb.detectAndCompute(imageDataGrayMat2, new cv.Mat(), keypoints2, descriptors2);

        let good_matches = await new cv.DMatchVector();

        var bf = await new cv.BFMatcher(cv.NORM_HAMMING, true);
        let matches = new cv.DMatchVectorVector();
        bf.knnMatch(descriptors1, descriptors2, matches, 2);

        let counter = 0;
        for (let i = 0; i < matches.size(); ++i) {
          let match = matches.get(i);
          let dMatch1 = match.get(0);
          let dMatch2 = match.get(1);
          //console.log("[", i, "] ", "dMatch1: ", dMatch1, "dMatch2: ", dMatch2);
          if (dMatch1.distance <= dMatch2.distance * parseFloat(0.7)) {
            //console.log("***Good Match***", "dMatch1.distance: ", dMatch1.distance, "was less than or = to: ", "dMatch2.distance * parseFloat(knnDistance_option)", dMatch2.distance * parseFloat(knnDistance_option), "dMatch2.distance: ", dMatch2.distance, "knnDistance", knnDistance_option);
            good_matches.push_back(dMatch1);
            counter++;
          }
        }
        for (let t = 0; t < matches.size(); ++t) {
          console.log("[" + t + "]", "matches: ", matches.get(t));
          if (t === 5) {
            break;
          }
        }
        for (let r = 0; r < good_matches.size(); ++r) {
          console.log("[" + r + "]", "good_matches: ", good_matches.get(r));
          if (r === 5) {
            break;
          }
        }
        let imMatches = new cv.Mat();
        let color = new cv.Scalar(0, 255, 0, 255);
        cv.drawMatches(imageDataGrayMat, keypoints1, imageDataGrayMat2, keypoints2, good_matches, imMatches, color);
        cv.imshow("canvasOutput", imMatches);

        let keypoints1_img = new cv.Mat();
        let keypoints2_img = new cv.Mat();
        let keypointcolor = new cv.Scalar(0, 255, 0, 255);
        cv.drawKeypoints(imageDataGrayMat, keypoints1, keypoints1_img, keypointcolor);
        cv.drawKeypoints(imageDataGrayMat2, keypoints2, keypoints2_img, keypointcolor);

        cv.imshow("keypoints1", keypoints1_img);
        cv.imshow("keypoints2", keypoints2_img);

        let points1 = [];
        let points2 = [];
        for (let i = 0; i < good_matches.size(); i++) {
          points1.push(keypoints1.get(good_matches.get(i).queryIdx).pt.x);
          points1.push(keypoints1.get(good_matches.get(i).queryIdx).pt.y);
          points2.push(keypoints2.get(good_matches.get(i).trainIdx).pt.x);
          points2.push(keypoints2.get(good_matches.get(i).trainIdx).pt.y);
        }

        var mat1 = new cv.Mat(points1.length, 1, cv.CV_32FC2);
        mat1.data32F.set(points1);
        var mat2 = new cv.Mat(points2.length, 1, cv.CV_32FC2);
        mat2.data32F.set(points2);

        let h = await cv.findHomography(mat1, mat2, cv.RANSAC);

        let image_B_final_result = await new cv.Mat();
        console.log(imageDataGrayMat2.size());
        console.log(image_B_final_result);
        await cv.warpPerspective(imageDataGrayMat, image_B_final_result, h, imageDataGrayMat2.size());
        ctx.clearRect(0, 0, 1000, 1000);
        await cv.imshow("canvasOutput", image_B_final_result);

        // matches.delete();
        // bf.delete();
        // orb.delete();
        // descriptors1.delete();
        // descriptors2.delete();
        // keypoints1.delete();
        // keypoints2.delete();
        // imageDataGrayMat.delete();
        // imageDataGrayMat2.delete();
        // h.delete();
        // image_B_final_result.delete();
        // mat1.delete();
        // mat2.delete();

        // good_matches.sort(function (a, b) {
        //   return a.x - b.x;
        // });

        console.log(imMatches);

        // await cv.matchTemplate(imageDataGrayMat, imageDataGrayMat2, resultMat, cv.TM_CCOEFF_NORMED);
        // const minMax = cv.minMaxLoc(resultMat);
        // console.log(resultMat);
        // const topLeft = minMax.maxLoc;
        // const bottomRight = new cv.Point(topLeft.x + imageDataGrayMat.cols, topLeft.y + imageDataGrayMat.rows);

        // console.log(bottomRight);
        // // Рисуем прямоугольник вокруг найденного совпадения
        // cv.rectangle(srcMat, topLeft, bottomRight, [0, 255, 0, 255], 2);

        // // Выводим результаты
        // cv.imshow("canvasOutput", srcMat);

        // srcMat.delete();
        // dstMat.delete();
      };
    };
  };
  return (
    <div>
      {OpenCVisMount ? (
        <>
          <input type="file" onChange={handlerInputImg} />
          <canvas id="canvasOutput" ref={canvasRef} style={{}}></canvas>
          <br />
          <img src={imgMain} />
          <img src={imgSecond} />
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
}

export default HandlerImage;
