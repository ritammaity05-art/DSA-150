import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codeeasy_backend.settings')
django.setup()

from apps.problems.models import Topic, Problem

TOPICS_DATA = [
    {"name": "Arrays", "slug": "arrays", "icon": "layout-grid", "description": "Sequential memory blocks and array manipulation techniques."},
    {"name": "Hashing", "slug": "hashing", "icon": "hash", "description": "Fast O(1) key-value lookup tables and set operations."},
    {"name": "Two Pointers", "slug": "two-pointers", "icon": "arrows-left-right", "description": "Converging and parallel pointer strategies for sorted structures."},
    {"name": "Sliding Window", "slug": "sliding-window", "icon": "scan", "description": "Dynamic window tracking for contiguous subarrays and substrings."},
    {"name": "Stack", "slug": "stack", "icon": "layers", "description": "LIFO (Last In First Out) structures for parsing and backtracking."},
    {"name": "Binary Search", "slug": "binary-search", "icon": "search", "description": "Logarithmic search space reduction on sorted arrays and functions."},
    {"name": "Linked List", "slug": "linked-list", "icon": "link", "description": "Node-pointer navigation and list transformations."},
    {"name": "Trees", "slug": "trees", "icon": "git-fork", "description": "Hierarchical structures, BFS/DFS traversal, and BST properties."},
    {"name": "Heap", "slug": "heap", "icon": "triangle", "description": "Priority queues for instant min/max element retrieval."},
    {"name": "Backtracking", "slug": "backtracking", "icon": "corner-down-left", "description": "Recursive state space exploration with pruning."},
    {"name": "Graphs", "slug": "graphs", "icon": "network", "description": "Nodes, edges, shortest paths, and topological sorting."},
    {"name": "Dynamic Programming", "slug": "dynamic-programming", "icon": "grid", "description": "Overlapping subproblems and memoization/tabulation."},
    {"name": "Greedy", "slug": "greedy", "icon": "zap", "description": "Locally optimal choices producing globally optimal results."},
    {"name": "Intervals", "slug": "intervals", "icon": "sliders", "description": "Overlapping intervals, merging, and scheduling."},
    {"name": "Math", "slug": "math", "icon": "calculator", "description": "Number theory, modular arithmetic, and geometric algorithms."},
    {"name": "Bit Manipulation", "slug": "bit-manipulation", "icon": "binary", "description": "Direct bitwise operations (AND, OR, XOR, shifts)."}
]

PROBLEMS_TOP_LIST = [
    # Topic 1: Arrays & Hashing
    (1, "Two Sum", "two-sum", "Easy", "arrays", "10 mins"),
    (2, "Contains Duplicate", "contains-duplicate", "Easy", "arrays", "8 mins"),
    (3, "Valid Anagram", "valid-anagram", "Easy", "hashing", "8 mins"),
    (4, "Group Anagrams", "group-anagrams", "Medium", "hashing", "15 mins"),
    (5, "Top K Frequent Elements", "top-k-frequent-elements", "Medium", "hashing", "15 mins"),
    (6, "Product of Array Except Self", "product-of-array-except-self", "Medium", "arrays", "18 mins"),
    (7, "Valid Sudoku", "valid-sudoku", "Medium", "hashing", "20 mins"),
    (8, "Encode and Decode Strings", "encode-and-decode-strings", "Medium", "arrays", "15 mins"),
    (9, "Longest Consecutive Sequence", "longest-consecutive-sequence", "Medium", "hashing", "18 mins"),
    (10, "Majority Element", "majority-element", "Easy", "arrays", "10 mins"),
    
    # Topic 2: Two Pointers
    (11, "Valid Palindrome", "valid-palindrome", "Easy", "two-pointers", "10 mins"),
    (12, "Two Sum II - Input Array Is Sorted", "two-sum-ii", "Medium", "two-pointers", "12 mins"),
    (13, "3Sum", "3sum", "Medium", "two-pointers", "20 mins"),
    (14, "Container With Most Water", "container-with-most-water", "Medium", "two-pointers", "15 mins"),
    (15, "Trapping Rain Water", "trapping-rain-water", "Hard", "two-pointers", "25 mins"),
    (16, "Move Zeroes", "move-zeroes", "Easy", "two-pointers", "10 mins"),
    (17, "Sort Colors", "sort-colors", "Medium", "two-pointers", "15 mins"),
    (18, "Remove Duplicates from Sorted Array", "remove-duplicates-sorted-array", "Easy", "two-pointers", "10 mins"),
    
    # Topic 3: Sliding Window
    (19, "Best Time to Buy and Sell Stock", "best-time-to-buy-and-sell-stock", "Easy", "sliding-window", "10 mins"),
    (20, "Longest Substring Without Repeating Characters", "longest-substring-without-repeating", "Medium", "sliding-window", "15 mins"),
    (21, "Longest Repeating Character Replacement", "longest-repeating-character-replacement", "Medium", "sliding-window", "18 mins"),
    (22, "Permutation in String", "permutation-in-string", "Medium", "sliding-window", "20 mins"),
    (23, "Minimum Window Substring", "minimum-window-substring", "Hard", "sliding-window", "25 mins"),
    (24, "Sliding Window Maximum", "sliding-window-maximum", "Hard", "sliding-window", "25 mins"),
    
    # Topic 4: Stack
    (25, "Valid Parentheses", "valid-parentheses", "Easy", "stack", "8 mins"),
    (26, "Min Stack", "min-stack", "Medium", "stack", "15 mins"),
    (27, "Evaluate Reverse Polish Notation", "evaluate-reverse-polish-notation", "Medium", "stack", "15 mins"),
    (28, "Generate Parentheses", "generate-parentheses", "Medium", "stack", "18 mins"),
    (29, "Daily Temperatures", "daily-temperatures", "Medium", "stack", "18 mins"),
    (30, "Car Fleet", "car-fleet", "Medium", "stack", "20 mins"),
    (31, "Largest Rectangle in Histogram", "largest-rectangle-in-histogram", "Hard", "stack", "25 mins"),

    # Topic 5: Binary Search
    (32, "Binary Search", "binary-search-prob", "Easy", "binary-search", "8 mins"),
    (33, "Search a 2D Matrix", "search-2d-matrix", "Medium", "binary-search", "12 mins"),
    (34, "Koko Eating Bananas", "koko-eating-bananas", "Medium", "binary-search", "18 mins"),
    (35, "Find Minimum in Rotated Sorted Array", "find-minimum-in-rotated-sorted-array", "Medium", "binary-search", "15 mins"),
    (36, "Search in Rotated Sorted Array", "search-in-rotated-sorted-array", "Medium", "binary-search", "18 mins"),
    (37, "Time Based Key-Value Store", "time-based-key-value-store", "Medium", "binary-search", "20 mins"),
    (38, "Median of Two Sorted Arrays", "median-of-two-sorted-arrays", "Hard", "binary-search", "30 mins"),

    # Topic 6: Linked List
    (39, "Reverse Linked List", "reverse-linked-list", "Easy", "linked-list", "10 mins"),
    (40, "Merge Two Sorted Lists", "merge-two-sorted-lists", "Easy", "linked-list", "10 mins"),
    (41, "Reorder List", "reorder-list", "Medium", "linked-list", "18 mins"),
    (42, "Remove Nth Node From End of List", "remove-nth-node-from-end-of-list", "Medium", "linked-list", "15 mins"),
    (43, "Copy List with Random Pointer", "copy-list-with-random-pointer", "Medium", "linked-list", "20 mins"),
    (44, "Add Two Numbers", "add-two-numbers", "Medium", "linked-list", "15 mins"),
    (45, "Linked List Cycle", "linked-list-cycle", "Easy", "linked-list", "10 mins"),
    (46, "Find the Duplicate Number", "find-duplicate-number", "Medium", "linked-list", "18 mins"),
    (47, "LRU Cache", "lru-cache", "Medium", "linked-list", "25 mins"),
    (48, "Merge K Sorted Lists", "merge-k-sorted-lists", "Hard", "linked-list", "25 mins"),
    (49, "Reverse Nodes in k-Group", "reverse-nodes-in-k-group", "Hard", "linked-list", "30 mins"),

    # Topic 7: Trees
    (50, "Invert Binary Tree", "invert-binary-tree", "Easy", "trees", "8 mins"),
    (51, "Maximum Depth of Binary Tree", "maximum-depth-of-binary-tree", "Easy", "trees", "8 mins"),
    (52, "Diameter of Binary Tree", "diameter-of-binary-tree", "Easy", "trees", "10 mins"),
    (53, "Balanced Binary Tree", "balanced-binary-tree", "Easy", "trees", "10 mins"),
    (54, "Same Tree", "same-tree", "Easy", "trees", "8 mins"),
    (55, "Subtree of Another Tree", "subtree-of-another-tree", "Easy", "trees", "12 mins"),
    (56, "Lowest Common Ancestor of a Binary Search Tree", "lowest-common-ancestor-bst", "Medium", "trees", "15 mins"),
    (57, "Binary Tree Level Order Traversal", "binary-tree-level-order-traversal", "Medium", "trees", "15 mins"),
    (58, "Binary Tree Right Side View", "binary-tree-right-side-view", "Medium", "trees", "15 mins"),
    (59, "Count Good Nodes in Binary Tree", "count-good-nodes-in-binary-tree", "Medium", "trees", "15 mins"),
    (60, "Validate Binary Search Tree", "validate-binary-search-tree", "Medium", "trees", "15 mins"),
    (61, "Kth Smallest Element in a BST", "kth-smallest-element-in-a-bst", "Medium", "trees", "15 mins"),
    (62, "Construct Binary Tree from Preorder and Inorder Traversal", "construct-tree-preorder-inorder", "Medium", "trees", "20 mins"),
    (63, "Binary Tree Maximum Path Sum", "binary-tree-maximum-path-sum", "Hard", "trees", "25 mins"),
    (64, "Serialize and Deserialize Binary Tree", "serialize-and-deserialize-binary-tree", "Hard", "trees", "25 mins"),

    # Topic 8: Heap / Priority Queue
    (65, "Kth Largest Element in a Stream", "kth-largest-element-in-a-stream", "Easy", "heap", "10 mins"),
    (66, "Last Stone Weight", "last-stone-weight", "Easy", "heap", "10 mins"),
    (67, "K Closest Points to Origin", "k-closest-points-to-origin", "Medium", "heap", "15 mins"),
    (68, "Kth Largest Element in an Array", "kth-largest-element-in-an-array", "Medium", "heap", "15 mins"),
    (69, "Task Scheduler", "task-scheduler", "Medium", "heap", "20 mins"),
    (70, "Design Twitter", "design-twitter", "Medium", "heap", "25 mins"),
    (71, "Find Median from Data Stream", "find-median-from-data-stream", "Hard", "heap", "25 mins"),

    # Topic 9: Backtracking
    (72, "Subsets", "subsets", "Medium", "backtracking", "15 mins"),
    (73, "Combination Sum", "combination-sum", "Medium", "backtracking", "18 mins"),
    (74, "Permutations", "permutations", "Medium", "backtracking", "15 mins"),
    (75, "Subsets II", "subsets-ii", "Medium", "backtracking", "18 mins"),
    (76, "Combination Sum II", "combination-sum-ii", "Medium", "backtracking", "18 mins"),
    (77, "Word Search", "word-search", "Medium", "backtracking", "20 mins"),
    (78, "Palindrome Partitioning", "palindrome-partitioning", "Medium", "backtracking", "20 mins"),
    (79, "Letter Combinations of a Phone Number", "letter-combinations-phone-number", "Medium", "backtracking", "15 mins"),
    (80, "N-Queens", "n-queens", "Hard", "backtracking", "30 mins"),

    # Topic 10: Graphs
    (81, "Number of Islands", "number-of-islands", "Medium", "graphs", "15 mins"),
    (82, "Clone Graph", "clone-graph", "Medium", "graphs", "15 mins"),
    (83, "Max Area of Island", "max-area-of-island", "Medium", "graphs", "15 mins"),
    (84, "Pacific Atlantic Water Flow", "pacific-atlantic-water-flow", "Medium", "graphs", "20 mins"),
    (85, "Surrounded Regions", "surrounded-regions", "Medium", "graphs", "18 mins"),
    (86, "Rotting Oranges", "rotting-oranges", "Medium", "graphs", "18 mins"),
    (87, "Walls and Gates", "walls-and-gates", "Medium", "graphs", "18 mins"),
    (88, "Course Schedule", "course-schedule", "Medium", "graphs", "20 mins"),
    (89, "Course Schedule II", "course-schedule-ii", "Medium", "graphs", "20 mins"),
    (90, "Redundant Connection", "redundant-connection", "Medium", "graphs", "18 mins"),
    (91, "Number of Connected Components in an Undirected Graph", "connected-components-graph", "Medium", "graphs", "15 mins"),
    (92, "Graph Valid Tree", "graph-valid-tree", "Medium", "graphs", "15 mins"),
    (93, "Word Ladder", "word-ladder", "Hard", "graphs", "25 mins"),

    # Topic 11: Dynamic Programming
    (94, "Climbing Stairs", "climbing-stairs", "Easy", "dynamic-programming", "8 mins"),
    (95, "Min Cost Climbing Stairs", "min-cost-climbing-stairs", "Easy", "dynamic-programming", "10 mins"),
    (96, "House Robber", "house-robber", "Medium", "dynamic-programming", "15 mins"),
    (97, "House Robber II", "house-robber-ii", "Medium", "dynamic-programming", "18 mins"),
    (98, "Longest Palindromic Substring", "longest-palindromic-substring", "Medium", "dynamic-programming", "18 mins"),
    (99, "Palindromic Substrings", "palindromic-substrings", "Medium", "dynamic-programming", "15 mins"),
    (100, "Decode Ways", "decode-ways", "Medium", "dynamic-programming", "18 mins"),
    (101, "Coin Change", "coin-change", "Medium", "dynamic-programming", "18 mins"),
    (102, "Maximum Product Subarray", "maximum-product-subarray", "Medium", "dynamic-programming", "18 mins"),
    (103, "Word Break", "word-break", "Medium", "dynamic-programming", "20 mins"),
    (104, "Longest Increasing Subsequence", "longest-increasing-subsequence", "Medium", "dynamic-programming", "20 mins"),
    (105, "Partition Equal Subset Sum", "partition-equal-subset-sum", "Medium", "dynamic-programming", "20 mins"),
    (106, "Unique Paths", "unique-paths", "Medium", "dynamic-programming", "15 mins"),
    (107, "Longest Common Subsequence", "longest-common-subsequence", "Medium", "dynamic-programming", "20 mins"),
    (108, "Best Time to Buy and Sell Stock with Cooldown", "stock-cooldown", "Medium", "dynamic-programming", "20 mins"),
    (109, "Coin Change II", "coin-change-ii", "Medium", "dynamic-programming", "20 mins"),
    (110, "Target Sum", "target-sum", "Medium", "dynamic-programming", "20 mins"),
    (111, "Interleaving String", "interleaving-string", "Medium", "dynamic-programming", "22 mins"),
    (112, "Longest Increasing Path in a Matrix", "longest-increasing-path-matrix", "Hard", "dynamic-programming", "25 mins"),
    (113, "Distinct Subsequences", "distinct-subsequences", "Hard", "dynamic-programming", "25 mins"),
    (114, "Edit Distance", "edit-distance", "Hard", "dynamic-programming", "25 mins"),
    (115, "Burst Balloons", "burst-balloons", "Hard", "dynamic-programming", "30 mins"),
    (116, "Regular Expression Matching", "regular-expression-matching", "Hard", "dynamic-programming", "30 mins"),

    # Topic 12: Greedy
    (117, "Maximum Subarray", "maximum-subarray", "Medium", "greedy", "12 mins"),
    (118, "Jump Game", "jump-game", "Medium", "greedy", "15 mins"),
    (119, "Jump Game II", "jump-game-ii", "Medium", "greedy", "18 mins"),
    (120, "Gas Station", "gas-station", "Medium", "greedy", "18 mins"),
    (121, "Hand of Straights", "hand-of-straights", "Medium", "greedy", "18 mins"),
    (122, "Merge Triplets to Form Target Triplet", "merge-triplets-target", "Medium", "greedy", "15 mins"),
    (123, "Partition Labels", "partition-labels", "Medium", "greedy", "15 mins"),
    (124, "Valid Parenthesis String", "valid-parenthesis-string", "Medium", "greedy", "18 mins"),

    # Topic 13: Intervals
    (125, "Insert Interval", "insert-interval", "Medium", "intervals", "15 mins"),
    (126, "Merge Intervals", "merge-intervals", "Medium", "intervals", "15 mins"),
    (127, "Non-overlapping Intervals", "non-overlapping-intervals", "Medium", "intervals", "18 mins"),
    (128, "Meeting Rooms", "meeting-rooms", "Easy", "intervals", "10 mins"),
    (129, "Meeting Rooms II", "meeting-rooms-ii", "Medium", "intervals", "15 mins"),
    (130, "Minimum Interval to Include Each Query", "minimum-interval-queries", "Hard", "intervals", "25 mins"),

    # Topic 14: Math & Geometry
    (131, "Rotate Image", "rotate-image", "Medium", "math", "15 mins"),
    (132, "Spiral Matrix", "spiral-matrix", "Medium", "math", "18 mins"),
    (133, "Set Matrix Zeroes", "set-matrix-zeroes", "Medium", "math", "15 mins"),
    (134, "Happy Number", "happy-number", "Easy", "math", "10 mins"),
    (135, "Plus One", "plus-one", "Easy", "math", "8 mins"),
    (136, "Pow(x, n)", "pow-x-n", "Medium", "math", "15 mins"),
    (137, "Multiply Strings", "multiply-strings", "Medium", "math", "20 mins"),
    (138, "Detect Squares", "detect-squares", "Medium", "math", "20 mins"),

    # Topic 15: Bit Manipulation
    (139, "Single Number", "single-number", "Easy", "bit-manipulation", "8 mins"),
    (140, "Number of 1 Bits", "number-of-1-bits", "Easy", "bit-manipulation", "8 mins"),
    (141, "Counting Bits", "counting-bits", "Easy", "bit-manipulation", "10 mins"),
    (142, "Reverse Bits", "reverse-bits", "Easy", "bit-manipulation", "10 mins"),
    (143, "Missing Number", "missing-number", "Easy", "bit-manipulation", "8 mins"),
    (144, "Sum of Two Integers", "sum-of-two-integers", "Medium", "bit-manipulation", "15 mins"),
    (145, "Reverse Integer", "reverse-integer", "Medium", "bit-manipulation", "12 mins"),

    # Topic 16: Advanced / Bonus Top Problems
    (146, "Implement Trie (Prefix Tree)", "implement-trie", "Medium", "trees", "18 mins"),
    (147, "Design Add and Search Words Data Structure", "design-add-search-words", "Medium", "trees", "20 mins"),
    (148, "Word Search II", "word-search-ii", "Hard", "backtracking", "30 mins"),
    (149, "Reconstruct Itinerary", "reconstruct-itinerary", "Hard", "graphs", "25 mins"),
    (150, "Swim in Rising Water", "swim-in-rising-water", "Hard", "graphs", "25 mins"),
]

def seed_database():
    print("🌱 Seeding CodeEasy 150 Database...")
    
    # 1. Create Topics
    topic_map = {}
    for idx, tdata in enumerate(TOPICS_DATA):
        topic, created = Topic.objects.get_or_create(
            slug=tdata["slug"],
            defaults={
                "name": tdata["name"],
                "icon": tdata["icon"],
                "description": tdata["description"],
                "order": idx + 1
            }
        )
        topic_map[tdata["slug"]] = topic
    print(f"✅ Loaded {len(topic_map)} Topics")

    # Sample detailed rich problems data for flagship problems
    DETAILED_PROBLEMS_CUSTOM = {
        1: { # Two Sum
            "summary": "You are given a list of numbers and a target value. Your task is to find the indices of the two distinct numbers in the list that add up exactly to the target value.",
            "analogy": "Imagine you are at a party looking for a dance partner. Each person wears a badge with their age. You need to find two friends whose ages combined match the VIP secret number (target)! As you walk down the line, instead of looking back at everyone, you jot down who you've already seen on a notepad.",
            "easy_explanation": "Instead of checking every possible pair of numbers (which takes a long time!), we can walk through the array line by line. For every number we see, we ask: 'What number would complete me to hit the target?' We check if we've already stored that complete pair in our quick memory (HashMap). If yes, we win! If no, we write our current number in the memory and move forward.",
            "bengali_explanation": "আপনাকে কিছু সংখ্যার একটি তালিকা এবং একটি নির্দিষ্ট টার্গেট সংখ্যা দেওয়া হয়েছে। আপনাকে এমন দুটি ভিন্ন সংখ্যার পজিশন (ইন্ডেক্স) খুঁজে বের করতে হবে যাদের যোগফল ওই টার্গেটের সমান হয়। হ্যাশম্যাপ (HashMap) ব্যবহার করে আমরা প্রতিটা সংখ্যার জন্য প্রয়োজনীয় 'সঙ্গী' সংখ্যাটি ইতোমধ্যে দেখা হয়েছে কি না তা খুব সহজেই মাত্র O(n) সময়ে বের করে ফেলতে পারি।",
            "intuition": "The key realization is that target - current_number = complement. Instead of comparing current_number with all other numbers using a nested loop, a HashMap lets us remember past numbers and check if the complement exists in constant time O(1).",
            "hint1_tiny": "💡 Can you write down what number is needed when you encounter the first element?",
            "hint2_better": "💡 If target = 9 and current = 2, you need 7. How can you instantly check if 7 was seen earlier?",
            "hint3_almost": "💡 Use a HashMap where keys are the numbers seen so far and values are their array indices.",
            "code_python": "def twoSum(nums: list[int], target: int) -> list[int]:\n    seen = {}  # val -> index\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []",
            "code_cpp": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); ++i) {\n            int complement = target - nums[i];\n            if (seen.find(complement) != seen.end()) {\n                return {seen[complement], i};\n            }\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};",
            "code_java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (seen.containsKey(complement)) {\n                return new int[] { seen.get(complement), i };\n            }\n            seen.put(nums[i], i);\n        }\n        return new int[]{};\n    }  \n}",
            "code_javascript": "function twoSum(nums, target) {\n    const seen = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (seen.has(complement)) {\n            return [seen.get(complement), i];\n        }\n        seen.set(nums[i], i);\n    }\n    return [];\n}",
            "line_by_line": [
                {"line": 2, "code": "seen = {}", "explanation": "Initialize an empty hashmap to record visited numbers and their indices."},
                {"line": 3, "code": "for i, num in enumerate(nums):", "explanation": "Loop through each element keeping track of index i and value num."},
                {"line": 4, "code": "complement = target - num", "explanation": "Calculate the exact partner value required to sum up to target."},
                {"line": 5, "code": "if complement in seen:", "explanation": "Check if our partner has already been stored in our map earlier."},
                {"line": 6, "code": "return [seen[complement], i]", "explanation": "Found it! Return the partner's saved index and our current index i."},
                {"line": 7, "code": "seen[num] = i", "explanation": "Partner not found yet, so save current number and its index in the map for future iterations."}
            ],
            "dry_run_steps": [
                {"step": 1, "title": "Step 1: Inspect Index 0", "desc": "Current num = 2. Target = 9. Partner needed = 9 - 2 = 7. HashMap is empty {}. Partner 7 not found. Store 2 -> index 0.", "state": {"nums": [2, 7, 11, 15], "target": 9, "current_idx": 0, "current_val": 2, "needed": 7, "found": False, "hashmap": {"2": 0}}},
                {"step": 2, "title": "Step 2: Inspect Index 1", "desc": "Current num = 7. Target = 9. Partner needed = 9 - 7 = 2. HashMap contains 2 at index 0! Partner found! Result = [0, 1].", "state": {"nums": [2, 7, 11, 15], "target": 9, "current_idx": 1, "current_val": 7, "needed": 2, "found": True, "hashmap": {"2": 0}, "result": [0, 1]}}
            ],
            "time_complexity": "O(n)",
            "time_complexity_reason": "We iterate through the array of length n exactly once. Looking up and inserting into a HashMap takes O(1) average time.",
            "space_complexity": "O(n)",
            "space_complexity_reason": "In the worst case (e.g. partner is at the very end), we store up to n elements in the HashMap.",
            "common_mistakes": [
                {"title": "Using the same element twice", "desc": "Returning [0, 0] if nums[0] + nums[0] == target. The problem explicitly requires two distinct indices."},
                {"title": "Nested Brute Force Loops", "desc": "Using two nested loops O(n²) instead of a HashMap O(n). While correct, it will Time Out on large inputs."}
            ],
            "eli10_explanation": "Imagine you have 9 candies goal. You pull out a bag of 2 candies. You ask: 'Who has 7 candies?' Nobody answered yet, so you put your name tag on 2 and set it on the table. Next, your friend pulls out 7 candies. He checks the table and sees your 2 candies! Together 2 + 7 = 9. You win!",
            "extra_example": {"input": "nums = [3, 2, 4], target = 6", "output": "[1, 2]", "explanation": "Target 6 - 3 = 3 (not seen). Next num 2 -> needed 4 (not seen). Next num 4 -> needed 2 (found at index 1!). Output [1, 2]."}
        },
        25: { # Valid Parentheses
            "summary": "Given a string containing characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid (every open bracket must be closed by the same type in the correct order).",
            "analogy": "Think of nested Russian Matryoshka dolls. When you open a big doll, the next doll you close must be the innermost one you just opened!",
            "easy_explanation": "We use a Stack (like a stack of cafeteria plates). When we see an opening bracket, we push it onto the stack. When we see a closing bracket, we check if the top plate matches it. If yes, pop it off. If no or stack is empty, it's invalid!",
            "bengali_explanation": "ব্র্যাকেটের সমতা পরীক্ষা করার জন্য স্ট্যাক (Stack) ডাটা স্ট্রাকচার হলো সবচেয়ে উপযোগী। যখনই কোনো ওপেনিং ব্র্যাকেট (যেমন '(', '{', '[') পাওয়া যাবে, তাকে স্ট্যাকে পুশ করবো। আর সমাপনী ব্র্যাকেট পেলে স্ট্যাকের ওপরের শেষ ব্র্যাকেটের সাথে মিলিয়ে পপ করবো।",
            "intuition": "Last Opened bracket MUST be First Closed (LIFO principle). Stack inherently preserves this exact ordering requirement.",
            "hint1_tiny": "💡 What data structure remembers the most recently added item first?",
            "hint2_better": "💡 Push opening brackets. When encountering a closing bracket, pop and verify if it matches.",
            "hint3_almost": "💡 Don't forget to check if the stack is completely empty at the end!",
            "code_python": "def isValid(s: str) -> bool:\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            top_element = stack.pop() if stack else '#'\n            if mapping[char] != top_element:\n                return False\n        else:\n            stack.append(char)\n    return not stack",
            "code_cpp": "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                if (c == ')' && st.top() != '(') return false;\n                if (c == '}' && st.top() != '{') return false;\n                if (c == ']' && st.top() != '[') return false;\n                st.pop();\n            }\n        }\n        return st.empty();\n    }\n};",
            "code_java": "class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}",
            "code_javascript": "function isValid(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    for (let char of s) {\n        if (map[char]) {\n            if (stack.pop() !== map[char]) return false;\n        } else {\n            stack.push(char);\n        }\n    }\n    return stack.length === 0;\n}",
            "line_by_line": [
                {"line": 2, "code": "stack = []", "explanation": "Create an empty list to act as our LIFO stack."},
                {"line": 3, "code": "mapping = {')': '(', ...}", "explanation": "Map each closing bracket to its corresponding opening bracket."},
                {"line": 5, "code": "if char in mapping:", "explanation": "If current character is a closing bracket, we must validate against top of stack."},
                {"line": 6, "code": "top = stack.pop() if stack else '#'", "explanation": "Pop the last opened bracket from stack or set dummy if stack is empty."},
                {"line": 9, "code": "stack.append(char)", "explanation": "Character is an opening bracket, push onto stack."}
            ],
            "dry_run_steps": [
                {"step": 1, "title": "Step 1: Character '('", "desc": "Opening bracket. Push '(' onto stack. Stack = ['(']", "state": {"s": "()[]{}", "char": "(", "stack": ["("], "valid": True}},
                {"step": 2, "title": "Step 2: Character ')'", "desc": "Closing bracket. Pop top of stack -> '('. Matches! Stack = []", "state": {"s": "()[]{}", "char": ")", "stack": [], "valid": True}},
                {"step": 3, "title": "Step 3: Character '['", "desc": "Opening bracket. Push '[' onto stack. Stack = ['[']", "state": {"s": "()[]{}", "char": "[", "stack": ["["], "valid": True}}
            ],
            "time_complexity": "O(n)",
            "time_complexity_reason": "We process each character in the string of length n once with O(1) stack operations.",
            "space_complexity": "O(n)",
            "space_complexity_reason": "In the worst case (e.g. '((((('), the stack stores up to n opening brackets.",
            "common_mistakes": [
                {"title": "Forgetting leftover open brackets", "desc": "Returning True for '(' because no mismatches occurred, forgetting to check if stack is empty."},
                {"title": "Popping from empty stack", "desc": "Calling pop() on empty stack when encountering closing bracket first (e.g. ')(')."}
            ],
            "eli10_explanation": "Think of putting clean dinner plates in a box. You put an round plate '('. When you take a plate out, it must be the round lid ')'. If you put a square plate '[', you must take off square lid ']' first!",
            "extra_example": {"input": "s = '([)]'", "output": "false", "explanation": "Stack pushes '(', then '['. Next is ')', but top of stack is '[' which doesn't match '('! Returns false."}
        }
    }

    # Populate 150 problems
    for ptuple in PROBLEMS_TOP_LIST:
        id_num, title, slug, diff, topic_slug, est_time = ptuple
        topic_obj = topic_map[topic_slug]
        
        custom_data = DETAILED_PROBLEMS_CUSTOM.get(id_num, {})
        
        # Generic high quality beginner friendly fallback template if custom detailed data isn't defined
        summary = custom_data.get("summary", f"Learn how to solve {title} using an optimal algorithm designed for software engineering technical interviews.")
        analogy = custom_data.get("analogy", f"Solving {title} is like finding the most efficient shortcut on a map using step-by-step logic instead of random guessing.")
        easy_exp = custom_data.get("easy_explanation", f"We analyze the problem requirements, identify key properties of {topic_obj.name}, and build a step-by-step solution that reduces unnecessary comparisons.")
        bengali_exp = custom_data.get("bengali_explanation", f"সহজ বাংলা ব্যাখ্যা: {title} সমস্যাটি সমাধান করার জন্য {topic_obj.name} টেকনিক ব্যবহার করে আমরা ধাপে ধাপে অ্যালগোরিদমটি উপস্থাপন করেছি।")
        intuition = custom_data.get("intuition", f"By leveraging the properties of {topic_obj.name}, we can avoid duplicate checks and optimize execution speed.")
        
        code_py = custom_data.get("code_python", f"# Python Solution for {title}\ndef solve():\n    # Optimal approach using {topic_obj.name}\n    pass")
        code_cpp = custom_data.get("code_cpp", f"// C++ Solution for {title}\nclass Solution {{\npublic:\n    void solve() {{\n        // Optimal approach\n    }}\n}};")
        code_java = custom_data.get("code_java", f"// Java Solution for {title}\nclass Solution {{\n    public void solve() {{\n        // Optimal approach\n    }}\n}}")
        code_js = custom_data.get("code_javascript", f"// JavaScript Solution for {title}\nfunction solve() {{\n    // Optimal approach\n}}")
        
        line_by_line = custom_data.get("line_by_line", [
            {"line": 1, "code": f"def solution():", "explanation": f"Function entry point for {title}."},
            {"line": 2, "code": "    # Step 1: Process input", "explanation": "Extract key input state and initialize data structures."},
            {"line": 3, "code": "    return result", "explanation": "Return computed optimal answer."}
        ])

        dry_run = custom_data.get("dry_run_steps", [
            {"step": 1, "title": "Initialization", "desc": f"Set up initial variables and pointers for {title}.", "state": {"step": 1, "status": "Ready", "data": [1, 2, 3]}},
            {"step": 2, "title": "Execution Step", "desc": "Process data element by element.", "state": {"step": 2, "status": "Processing", "pointer": 1}},
            {"step": 3, "title": "Completion", "desc": "Return final computed answer.", "state": {"step": 3, "status": "Done", "result": "Success"}}
        ])

        Problem.objects.update_or_create(
            id_number=id_num,
            defaults={
                "title": title,
                "slug": slug,
                "difficulty": diff,
                "topic": topic_obj,
                "estimated_time": est_time,
                "summary": summary,
                "analogy": analogy,
                "easy_explanation": easy_exp,
                "bengali_explanation": bengali_exp,
                "intuition": intuition,
                "hint1_tiny": custom_data.get("hint1_tiny", f"💡 Think about how {topic_obj.name} helps simplify this task."),
                "hint2_better": custom_data.get("hint2_better", "💡 Is there a pattern or invariant you can track?"),
                "hint3_almost": custom_data.get("hint3_almost", "💡 Combine the data structure lookup with a single pass through the input."),
                "code_python": code_py,
                "code_cpp": code_cpp,
                "code_java": code_java,
                "code_javascript": code_js,
                "line_by_line": line_by_line,
                "dry_run_steps": dry_run,
                "time_complexity": custom_data.get("time_complexity", "O(n)" if diff != "Hard" else "O(n log n)"),
                "time_complexity_reason": custom_data.get("time_complexity_reason", f"Single iteration over input elements using {topic_obj.name}."),
                "space_complexity": custom_data.get("space_complexity", "O(1)" if topic_slug in ["two-pointers", "binary-search"] else "O(n)"),
                "space_complexity_reason": custom_data.get("space_complexity_reason", "Memory used for auxiliary storage structures."),
                "common_mistakes": custom_data.get("common_mistakes", [
                    {"title": "Off-by-one errors", "desc": "Incorrect array index bound checks at start or end."},
                    {"title": "Edge cases handling", "desc": "Empty inputs or single-element array failure."}
                ]),
                "eli10_explanation": custom_data.get("eli10_explanation", f"Think of this problem like sorting toys into labeled bins so you can find your favorite toy in 1 second!"),
                "extra_example": custom_data.get("extra_example", {"input": "Sample Input", "output": "Sample Output", "explanation": "Walkthrough of second test case."}),
                "is_daily_problem": (id_num == 1) # Problem #1 as daily problem spotlight
            }
        )

    print(f"🎉 Successfully seeded {len(PROBLEMS_TOP_LIST)} problems into database!")

if __name__ == '__main__':
    seed_database()
