<div align="center">

  <h1>👁️ RetinaLens AI</h1>
  <h3>Clinical Decision Support System for Diabetic Retinopathy</h3>
  
  <p>
    <strong>An end-to-end medical deep learning platform achieving 96.24% accuracy in automated retinal screening.</strong>
  </p>

  <p>
    <a href="#-machine-learning-architecture"><strong>🧠 The ML Engine</strong></a> •
    <a href="#-the-secret-sauce-ben-graham-processing"><strong>🔬 Medical Preprocessing</strong></a> •
    <a href="#-system-architecture"><strong>🏗️ Architecture</strong></a>
  </p>

  <img src="https://img.shields.io/badge/Python-3.10-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/TensorFlow-2.17-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" />
  <img src="https://img.shields.io/badge/OpenCV-Computer_Vision-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" />

</div>

---

## 📖 Executive Summary

**RetinaLens AI** is a full-stack, production-ready artificial intelligence system designed to assist ophthalmologists in diagnosing Diabetic Retinopathy (DR) from fundus photography. 

By bridging the gap between advanced Computer Vision techniques and modern web deployment, this project demonstrates how deep learning can be packaged into a secure, low-latency, and highly accurate clinical tool.

---
<img width="595" height="593" alt="Screenshot 2026-03-27 094332" src="https://github.com/user-attachments/assets/8769d04e-4c75-4a11-a327-ef4530ac6861" />


<img width="973" height="594" alt="image" src="https://github.com/user-attachments/assets/615d78b3-b01b-4e54-bb86-2050cc1b0bcf" />

## 🧠 Machine Learning Architecture

Building a medical AI requires more than generic image classification. The model was engineered to detect microscopic features (microaneurysms, hard exudates, and hemorrhages) while remaining lightweight enough for CPU-based cloud deployment.

### 1. Model Selection: `EfficientNetV2-B2`
*   **Why EfficientNetV2?** Unlike traditional ResNet architectures, EfficientNetV2 utilizes Fused-MBConv layers, maximizing parameter efficiency and texture extraction.
*   **Why the B2 Variant?** The B2 model accepts an input resolution of **260x260 pixels**. This is the critical "Medical Sweet Spot"—high enough to detect tiny retinal hemorrhages, but optimized enough to yield sub-second inference times on a standard server.

### 2. Training Strategy
*   **Transfer Learning:** Initialized with `ImageNet` weights.
*   **Phase 1 (Warmup):** Frozen base model, training only the custom dense classification head using the Adam optimizer to establish baseline spatial awareness.
*   **Phase 2 (Deep Fine-Tuning):** Unfroze the top 40% of the network, utilizing a significantly lower learning rate (`1e-5`) to force the model to unlearn generic objects and adapt specifically to vascular structures.
*   **Class Balancing:** Handled dataset asymmetry dynamically by computing exact inverse-frequency class weights prior to training, ensuring zero bias toward the "Healthy" majority class.

---

## 🔬 The "Secret Sauce": Ben Graham Processing

Feeding raw fundus images into a neural network often results in a phenomenon known as the **Domain Gap**—the model learns to classify the *lighting* and *camera type* rather than the disease. 

To achieve clinical accuracy, I implemented a robust **OpenCV** preprocessing pipeline inspired by Kaggle Grandmaster Ben Graham:

1.  **Circular Contour Cropping:** Algorithmically detects and removes the uninformative black void surrounding the retina, focusing 100% of the tensor space on biological data.
2.  **Gaussian Blur Subtraction:** Applies a localized color/lighting normalization via `cv2.addWeighted`. This strips away lighting variations (orange/red biases) and creates a high-contrast map where veins and pathological lesions drastically "pop" out to the convolutional filters.

---

## 📊 Dataset & Performance Metrics

Trained on the **APTOS 2019 Blindness Detection** dataset (3,662 high-resolution clinical samples from Aravind Eye Hospital, India). The 5-tier ICDRSS severity scale was mapped into a high-utility **Binary Classification** task (Referable vs. Non-Referable).

*   **Validation Accuracy:** `96.24%`
*   **Validation Loss:** `0.1043`
*   **Data Split:** 80% Training / 20% Hold-out Validation
*   **Augmentation:** Heavy rotational and flip augmentation (valid for circular fundus scans) to artificially expand the dataset footprint.

---

## 🏗️ System Architecture

The application operates on a decoupled **Microservices Architecture**, ensuring high availability and separation of concerns.

```mermaid
graph LR
  A[React/Vite Client] -->|Uploads Image| B(FastAPI Server)
  B -->|OpenCV Processing| C[Ben Graham Filter]
  C -->|Inference| D[EfficientNet Tensor]
  D -->|JSON Response| A
