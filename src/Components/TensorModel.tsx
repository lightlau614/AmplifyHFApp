import React, { useState, useEffect, useRef} from 'react';
import * as tf from '@tensorflow/tfjs';
import { IMAGENET_CLASSES } from '../references/mobilenetHocClasses';
import classify, { ClassifyReturn } from '../helpers/classify';

interface Props{
  imgPhoto: any,
  return_Pencent: Function
}

export default function TensorModel ( { imgPhoto, return_Pencent }:Props,  /*, {model} : { model : ModelInterface} */){

  const modelUrl = 'https://storage.googleapis.com/tfhub-tfjs-modules/google/tfjs-model/imagenet/mobilenet_v2_140_224/classification/3/default/1/model.json';

  const imgRef = useRef<HTMLImageElement>(null!);

  const [imgLoaded, setImgLoad] = useState<boolean>(false);

  const handleImgLoad = () => setImgLoad(true);

  useEffect( () => {
    
    const fetchModel = async () => {
      const { current: img } = imgRef
      
      const model = await tf.loadGraphModel(modelUrl);
      
      const tensor = tf.tidy(() => {
        const image = tf.browser.fromPixels(img)
    
        const normalized: tf.Tensor3D = image
          .toFloat()
          .mul(2 / 255)
          .add(-1)
    
        let resized = tf.image.resizeBilinear(normalized, [224, 224], true)
    
        return resized.reshape([-1, 224, 224, 3])
      })

      const result = model.predict(tensor) as tf.Tensor2D;
      const prediction = classify(result, 1, IMAGENET_CLASSES);
      
      return_Pencent(prediction);
      
    }
    
    fetchModel().catch(console.error);
    
  },[modelUrl, imgLoaded]);

  return (
    <>
      <img className='mx-auto d-block'
        onLoad={handleImgLoad}
        ref={imgRef}
        src={imgPhoto}
        crossOrigin='anonymous'

      />
    </>
  )
}

