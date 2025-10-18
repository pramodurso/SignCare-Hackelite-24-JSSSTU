import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load the processed dataset
with open('data.pickle', 'rb') as f:
    data_dict = pickle.load(f)

x_train = data_dict['train_data']
y_train = data_dict['train_labels']
x_test = data_dict['test_data']
y_test = data_dict['test_labels']

# Initialize and train the classifier
model = RandomForestClassifier(random_state=42)
model.fit(x_train, y_train)

# Evaluate the model
y_predict = model.predict(x_test)
accuracy = accuracy_score(y_test, y_predict)

print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save the trained model
with open('model.p', 'wb') as f:
    pickle.dump({'model': model}, f)

print("Model trained and saved successfully!")
