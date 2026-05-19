#include<iostream>
 using namespace std;

// Structure of a node in BST
struct Node {
    int data;        // Value of the node
    Node* left;     // Pointer to left child
    Node* right;    // Pointer to right child
};

// Function to create a new node
Node* createNode(int value) {
    Node* newNode = new Node();
    newNode->data = value;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// Function to insert a value in BST
Node* insert(Node* root, int value) {
    // If tree is empty, create a new node
    if (root == NULL) {
        return createNode(value);
    }

    // If value is smaller, go to left subtree
    if (value < root->data) {
        root->left = insert(root->left, value);
    }
    // If value is greater, go to right subtree
    else if (value > root->data) {
        root->right = insert(root->right, value);
    }

    // Return unchanged root pointer
    return root;
}

// Function to search a value in BST
bool search(Node* root, int key) {
    // If tree is empty, value not found
    if (root == NULL) {
        return false;
    }

    // If value is found
    if (root->data == key) {
        return true;
    }

    // If key is smaller, search in left subtree
    if (key < root->data) {
        return search(root->left, key);
    }
    // Else search in right subtree
    else {
        return search(root->right, key);
    }
}

// Inorder Traversal (for checking tree structure)
void inorder(Node* root) {
    if (root != NULL) {
        inorder(root->left);          // Visit left
        cout << root->data << " ";    // Visit root
        inorder(root->right);         // Visit right
    }
}

// Main function
int main() {
    Node* root = NULL;   // Initially tree is empty

    // Insert values in BST
    root = insert(root, 50);
    insert(root, 30);
    insert(root, 70);
    insert(root, 20);
    insert(root, 40);
    insert(root, 60);
    insert(root, 80);

    // Display tree using inorder traversal
    cout << "Inorder Traversal of BST: ";
    inorder(root);
    cout << endl;

    // Search operation
    int key;
    cout << "Enter value to search: ";
    cin >> key;

    if (search(root, key)) {
        cout << "Value " << key << " found in BST." << endl;
    } else {
        cout << "Value " << key << " NOT found in BST." << endl;
    }

    return 0;
}
