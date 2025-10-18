import os
import cv2
import time

# Constants
DATA_DIR = './data'
TRAIN_DIR = os.path.join(DATA_DIR, 'train')
TEST_DIR = os.path.join(DATA_DIR, 'test')
number_of_classes = 19
dataset_size = 500

# Create directories if they don't exist
for dir_path in [TRAIN_DIR, TEST_DIR]:
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

# Function to collect images for a specific dataset
def collect_images(dataset_type):
    dataset_path = TRAIN_DIR if dataset_type == "train" else TEST_DIR

    for j in range(number_of_classes):
        class_dir = os.path.join(dataset_path, str(j))
        if not os.path.exists(class_dir):
            os.makedirs(class_dir)

        print(f'Collecting data for class {j} ({dataset_type} dataset)')

        # Notify user to get ready
        while True:
            ret, frame = cap.read()
            cv2.putText(frame, f'Get ready for class {j} ({dataset_type}). Press "Q"!', 
                        (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 255, 0), 2, cv2.LINE_AA)
            cv2.imshow('frame', frame)
            if cv2.waitKey(25) & 0xFF == ord('q'):
                time.sleep(1)
                break

        # Capture images
        for i in range(dataset_size):
            ret, frame = cap.read()
            if not ret:
                continue

            file_path = os.path.join(class_dir, f'{i}.jpg')
            cv2.imwrite(file_path, frame)

            cv2.putText(frame, f'Captured {i+1}/{dataset_size}', 
                        (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 255, 0), 2, cv2.LINE_AA)
            cv2.imshow('frame', frame)
            cv2.waitKey(25)

        print(f"Finished collecting for class {j} ({dataset_type}).")

# Main script
cap = cv2.VideoCapture(0)

if cap.isOpened():
    print("Webcam detected. Starting data collection.")
    dataset_choice = input("Enter dataset type ('train' or 'test'): ").strip().lower()

    if dataset_choice in ['train', 'test']:
        collect_images(dataset_choice)
    else:
        print("Invalid input. Please restart and enter 'train' or 'test'.")
else:
    print("Error: Webcam not detected.")

cap.release()
cv2.destroyAllWindows()
