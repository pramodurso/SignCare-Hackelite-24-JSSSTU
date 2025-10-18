import os
import pickle
import mediapipe as mp
import cv2
import numpy as np

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3, max_num_hands=2)

# Paths for training and testing data
TRAIN_DIR = './data/train'
TEST_DIR = './data/test'

def process_images(data_dir):
    data = []
    labels = []

    for dir_ in os.listdir(data_dir):
        class_dir = os.path.join(data_dir, dir_)
        if not os.path.isdir(class_dir):
            continue

        for img_path in os.listdir(class_dir):
            x_, y_, data_aux = [], [], []

            img = cv2.imread(os.path.join(class_dir, img_path))
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

            results = hands.process(img_rgb)

            if results.multi_hand_landmarks:
                hands_data = []

                for hand_landmarks in results.multi_hand_landmarks:
                    hand_data = []

                    for landmark in hand_landmarks.landmark:
                        x_.append(landmark.x)
                        y_.append(landmark.y)

                    for landmark in hand_landmarks.landmark:
                        hand_data.append(landmark.x - min(x_))  # Normalize x
                        hand_data.append(landmark.y - min(y_))  # Normalize y

                    hands_data.append(hand_data)

                if len(hands_data) == 2:
                    data_aux.extend(hands_data[0])
                    data_aux.extend(hands_data[1])
                elif len(hands_data) == 1:
                    data_aux.extend(hands_data[0])
                    data_aux.extend([0] * len(hands_data[0]))  # Padding for second hand

                data.append(data_aux)
                labels.append(int(dir_))
    
    data_array = np.array(data)
    print('shape of data: ', data_array.shape)

    return np.array(data), np.array(labels)

# Process training and testing datasets
train_data, train_labels = process_images(TRAIN_DIR)
test_data, test_labels = process_images(TEST_DIR)



# Save the processed data
with open('data.pickle', 'wb') as f:
    pickle.dump({
        'train_data': train_data, 
        'train_labels': train_labels,
        'test_data': test_data, 
        'test_labels': test_labels
    }, f)
print('Data saved successfully!')

