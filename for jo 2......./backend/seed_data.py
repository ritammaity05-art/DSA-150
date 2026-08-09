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
    # Topic 1: Arrays & Hashing (10)
    (1, "Concatenation of Array", "concatenation-of-array", "Easy", "arrays", "5 mins"),
    (2, "Two Sum", "two-sum", "Easy", "arrays", "10 mins"),
    (3, "Contains Duplicate", "contains-duplicate", "Easy", "arrays", "8 mins"),
    (4, "Valid Anagram", "valid-anagram", "Easy", "hashing", "8 mins"),
    (5, "Group Anagrams", "group-anagrams", "Medium", "hashing", "15 mins"),
    (6, "Top K Frequent Elements", "top-k-frequent-elements", "Medium", "hashing", "15 mins"),
    (7, "Product of Array Except Self", "product-of-array-except-self", "Medium", "arrays", "18 mins"),
    (8, "Valid Sudoku", "valid-sudoku", "Medium", "hashing", "20 mins"),
    (9, "Encode and Decode Strings", "encode-and-decode-strings", "Medium", "arrays", "15 mins"),
    (10, "Longest Consecutive Sequence", "longest-consecutive-sequence", "Medium", "hashing", "18 mins"),

    # Topic 2: Two Pointers (8)
    (11, "Valid Palindrome", "valid-palindrome", "Easy", "two-pointers", "10 mins"),
    (12, "Two Sum II - Input Array Is Sorted", "two-sum-ii", "Medium", "two-pointers", "12 mins"),
    (13, "3Sum", "3sum", "Medium", "two-pointers", "20 mins"),
    (14, "Container With Most Water", "container-with-most-water", "Medium", "two-pointers", "15 mins"),
    (15, "Trapping Rain Water", "trapping-rain-water", "Hard", "two-pointers", "25 mins"),
    (16, "Move Zeroes", "move-zeroes", "Easy", "two-pointers", "10 mins"),
    (17, "Sort Colors", "sort-colors", "Medium", "two-pointers", "15 mins"),
    (18, "Remove Duplicates from Sorted Array", "remove-duplicates-sorted-array", "Easy", "two-pointers", "10 mins"),

    # Topic 3: Sliding Window (6)
    (19, "Best Time to Buy and Sell Stock", "best-time-to-buy-and-sell-stock", "Easy", "sliding-window", "10 mins"),
    (20, "Longest Substring Without Repeating Characters", "longest-substring-without-repeating", "Medium", "sliding-window", "15 mins"),
    (21, "Longest Repeating Character Replacement", "longest-repeating-character-replacement", "Medium", "sliding-window", "18 mins"),
    (22, "Permutation in String", "permutation-in-string", "Medium", "sliding-window", "20 mins"),
    (23, "Minimum Window Substring", "minimum-window-substring", "Hard", "sliding-window", "25 mins"),
    (24, "Sliding Window Maximum", "sliding-window-maximum", "Hard", "sliding-window", "25 mins"),

    # Topic 4: Stack (7)
    (25, "Valid Parentheses", "valid-parentheses", "Easy", "stack", "8 mins"),
    (26, "Min Stack", "min-stack", "Medium", "stack", "15 mins"),
    (27, "Evaluate Reverse Polish Notation", "evaluate-reverse-polish-notation", "Medium", "stack", "15 mins"),
    (28, "Generate Parentheses", "generate-parentheses", "Medium", "stack", "18 mins"),
    (29, "Daily Temperatures", "daily-temperatures", "Medium", "stack", "15 mins"),
    (30, "Car Fleet", "car-fleet", "Medium", "stack", "20 mins"),
    (31, "Largest Rectangle in Histogram", "largest-rectangle-in-histogram", "Hard", "stack", "25 mins"),

    # Topic 5: Binary Search (7)
    (32, "Binary Search", "binary-search", "Easy", "binary-search", "8 mins"),
    (33, "Search a 2D Matrix", "search-a-2d-matrix", "Medium", "binary-search", "12 mins"),
    (34, "Koko Eating Bananas", "koko-eating-bananas", "Medium", "binary-search", "18 mins"),
    (35, "Search in Rotated Sorted Array", "search-in-rotated-sorted-array", "Medium", "binary-search", "18 mins"),
    (36, "Find Minimum in Rotated Sorted Array", "find-minimum-in-rotated-sorted-array", "Medium", "binary-search", "15 mins"),
    (37, "Time Based Key-Value Store", "time-based-key-value-store", "Medium", "binary-search", "20 mins"),
    (38, "Median of Two Sorted Arrays", "median-of-two-sorted-arrays", "Hard", "binary-search", "30 mins"),

    # Topic 6: Linked List (10)
    (39, "Reverse Linked List", "reverse-linked-list", "Easy", "linked-list", "10 mins"),
    (40, "Merge Two Sorted Lists", "merge-two-sorted-lists", "Easy", "linked-list", "10 mins"),
    (41, "Reorder List", "reorder-list", "Medium", "linked-list", "18 mins"),
    (42, "Remove Nth Node From End of List", "remove-nth-node-from-end", "Medium", "linked-list", "15 mins"),
    (43, "Copy List with Random Pointer", "copy-list-with-random-pointer", "Medium", "linked-list", "20 mins"),
    (44, "Add Two Numbers", "add-two-numbers", "Medium", "linked-list", "15 mins"),
    (45, "Linked List Cycle", "linked-list-cycle", "Easy", "linked-list", "10 mins"),
    (46, "Find the Duplicate Number", "find-the-duplicate-number", "Medium", "linked-list", "15 mins"),
    (47, "LRU Cache", "lru-cache", "Medium", "linked-list", "25 mins"),
    (48, "Merge K Sorted Lists", "merge-k-sorted-lists", "Hard", "linked-list", "25 mins"),

    # Topic 7: Trees (16)
    (49, "Invert Binary Tree", "invert-binary-tree", "Easy", "trees", "8 mins"),
    (50, "Maximum Depth of Binary Tree", "maximum-depth-of-binary-tree", "Easy", "trees", "8 mins"),
    (51, "Diameter of Binary Tree", "diameter-of-binary-tree", "Easy", "trees", "10 mins"),
    (52, "Balanced Binary Tree", "balanced-binary-tree", "Easy", "trees", "10 mins"),
    (53, "Same Tree", "same-tree", "Easy", "trees", "8 mins"),
    (54, "Subtree of Another Tree", "subtree-of-another-tree", "Easy", "trees", "12 mins"),
    (55, "Lowest Common Ancestor of a BST", "lowest-common-ancestor", "Medium", "trees", "15 mins"),
    (56, "Binary Tree Level Order Traversal", "binary-tree-level-order-traversal", "Medium", "trees", "15 mins"),
    (57, "Binary Tree Right Side View", "binary-tree-right-side-view", "Medium", "trees", "15 mins"),
    (58, "Count Good Nodes in Binary Tree", "count-good-nodes-in-binary-tree", "Medium", "trees", "15 mins"),
    (59, "Validate Binary Search Tree", "validate-binary-search-tree", "Medium", "trees", "15 mins"),
    (60, "Kth Smallest Element in a BST", "kth-smallest-element-in-a-bst", "Medium", "trees", "15 mins"),
    (61, "Construct Binary Tree from Preorder and Inorder Traversal", "construct-tree-preorder-inorder", "Medium", "trees", "20 mins"),
    (62, "Binary Tree Maximum Path Sum", "binary-tree-maximum-path-sum", "Hard", "trees", "25 mins"),
    (63, "Serialize and Deserialize Binary Tree", "serialize-and-deserialize-binary-tree", "Hard", "trees", "25 mins"),
    (64, "Path Sum", "path-sum", "Easy", "trees", "10 mins"),

    # Topic 8: Heap / Priority Queue (7)
    (65, "Kth Largest Element in a Stream", "kth-largest-element-in-a-stream", "Easy", "heap", "10 mins"),
    (66, "Last Stone Weight", "last-stone-weight", "Easy", "heap", "10 mins"),
    (67, "K Closest Points to Origin", "k-closest-points-to-origin", "Medium", "heap", "15 mins"),
    (68, "Kth Largest Element in an Array", "kth-largest-element-in-an-array", "Medium", "heap", "15 mins"),
    (69, "Task Scheduler", "task-scheduler", "Medium", "heap", "20 mins"),
    (70, "Design Twitter", "design-twitter", "Medium", "heap", "25 mins"),
    (71, "Find Median from Data Stream", "find-median-from-data-stream", "Hard", "heap", "25 mins"),

    # Topic 9: Backtracking (9)
    (72, "Subsets", "subsets", "Medium", "backtracking", "15 mins"),
    (73, "Combination Sum", "combination-sum", "Medium", "backtracking", "18 mins"),
    (74, "Permutations", "permutations", "Medium", "backtracking", "15 mins"),
    (75, "Subsets II", "subsets-ii", "Medium", "backtracking", "18 mins"),
    (76, "Combination Sum II", "combination-sum-ii", "Medium", "backtracking", "18 mins"),
    (77, "Word Search", "word-search", "Medium", "backtracking", "20 mins"),
    (78, "Palindrome Partitioning", "palindrome-partitioning", "Medium", "backtracking", "20 mins"),
    (79, "Letter Combinations of a Phone Number", "letter-combinations-phone-number", "Medium", "backtracking", "15 mins"),
    (80, "N-Queens", "n-queens", "Hard", "backtracking", "30 mins"),

    # Topic 10: Graphs (13)
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

    # Topic 11: Dynamic Programming (23)
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

    # Topic 12: Greedy (8)
    (117, "Maximum Subarray", "maximum-subarray", "Medium", "greedy", "12 mins"),
    (118, "Jump Game", "jump-game", "Medium", "greedy", "15 mins"),
    (119, "Jump Game II", "jump-game-ii", "Medium", "greedy", "18 mins"),
    (120, "Gas Station", "gas-station", "Medium", "greedy", "18 mins"),
    (121, "Hand of Straights", "hand-of-straights", "Medium", "greedy", "18 mins"),
    (122, "Merge Triplets to Form Target Triplet", "merge-triplets-target", "Medium", "greedy", "15 mins"),
    (123, "Partition Labels", "partition-labels", "Medium", "greedy", "15 mins"),
    (124, "Valid Parenthesis String", "valid-parenthesis-string", "Medium", "greedy", "18 mins"),

    # Topic 13: Intervals (6)
    (125, "Insert Interval", "insert-interval", "Medium", "intervals", "15 mins"),
    (126, "Merge Intervals", "merge-intervals", "Medium", "intervals", "15 mins"),
    (127, "Non-overlapping Intervals", "non-overlapping-intervals", "Medium", "intervals", "18 mins"),
    (128, "Meeting Rooms", "meeting-rooms", "Easy", "intervals", "10 mins"),
    (129, "Meeting Rooms II", "meeting-rooms-ii", "Medium", "intervals", "15 mins"),
    (130, "Minimum Interval to Include Each Query", "minimum-interval-queries", "Hard", "intervals", "25 mins"),

    # Topic 14: Math & Geometry (8)
    (131, "Rotate Image", "rotate-image", "Medium", "math", "15 mins"),
    (132, "Spiral Matrix", "spiral-matrix", "Medium", "math", "18 mins"),
    (133, "Set Matrix Zeroes", "set-matrix-zeroes", "Medium", "math", "15 mins"),
    (134, "Happy Number", "happy-number", "Easy", "math", "10 mins"),
    (135, "Plus One", "plus-one", "Easy", "math", "8 mins"),
    (136, "Pow(x, n)", "pow-x-n", "Medium", "math", "15 mins"),
    (137, "Multiply Strings", "multiply-strings", "Medium", "math", "20 mins"),
    (138, "Detect Squares", "detect-squares", "Medium", "math", "20 mins"),

    # Topic 15: Bit Manipulation (7)
    (139, "Single Number", "single-number", "Easy", "bit-manipulation", "8 mins"),
    (140, "Number of 1 Bits", "number-of-1-bits", "Easy", "bit-manipulation", "8 mins"),
    (141, "Counting Bits", "counting-bits", "Easy", "bit-manipulation", "10 mins"),
    (142, "Reverse Bits", "reverse-bits", "Easy", "bit-manipulation", "10 mins"),
    (143, "Missing Number", "missing-number", "Easy", "bit-manipulation", "8 mins"),
    (144, "Sum of Two Integers", "sum-of-two-integers", "Medium", "bit-manipulation", "15 mins"),
    (145, "Reverse Integer", "reverse-integer", "Medium", "bit-manipulation", "12 mins"),

    # Topic 16: Advanced Graphs & Tries (5)
    (146, "Implement Trie (Prefix Tree)", "implement-trie", "Medium", "trees", "18 mins"),
    (147, "Design Add and Search Words Data Structure", "design-add-search-words", "Medium", "trees", "20 mins"),
    (148, "Word Search II", "word-search-ii", "Hard", "backtracking", "30 mins"),
    (149, "Reconstruct Itinerary", "reconstruct-itinerary", "Hard", "graphs", "25 mins"),
    (150, "Swim in Rising Water", "swim-in-rising-water", "Hard", "graphs", "25 mins"),
]

def seed_database():
    print("🌱 Seeding CodeEasy 150 Database (Full 150 Problems)...")
    Problem.objects.all().delete()
    
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

    # 2. Populate Problems
    for item in PROBLEMS_TOP_LIST:
        id_num, title, slug, diff, topic_slug, est_time = item
        topic_obj = topic_map.get(topic_slug) or list(topic_map.values())[0]

        is_concat = (slug == "concatenation-of-array")

        summary_text = (
            "Given an integer array nums of length n, create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i]."
            if is_concat else
            f"Solve {title} efficiently with optimal time and space complexity."
        )

        analogy_text = (
            "Imagine copying a set of 4 colored cards [Red, Blue, Green, Yellow] and placing an EXACT duplicate set right next to it! Now you have 8 cards total!"
            if is_concat else
            f"Imagine solving {title} step by step. Instead of checking every combination, use an optimal data structure to simplify logic!"
        )

        easy_exp = (
            "Given an integer array nums of length n, create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n."
            if is_concat else
            f"Learn the core trick behind {title} with 10-second golden rule and line-by-line breakdown."
        )

        bengali_exp = (
            "একটি পূর্ণসংখ্যার অ্যারে nums (দৈর্ঘ্য n) দেওয়া আছে। আপনাকে একটি নতুন অ্যারে ans তৈরি করতে হবে যার দৈর্ঘ্য হবে 2n। এখানে ans[i] = nums[i] এবং ans[i + n] = nums[i] হবে।"
            if is_concat else
            f"{title} সমস্যাটি খুব সহজে সমাধান করার জন্য নিয়ম ও লজিক নিচে ভেঙে আলোচনা করা হলো।"
        )

        python_code = (
            "def getConcatenation(nums):\n    return nums + nums"
            if is_concat else
            f"# Python solution for {title}\ndef solve(nums):\n    return nums"
        )

        cpp_code = (
            "class Solution {\npublic:\n    vector<int> getConcatenation(vector<int>& nums) {\n        vector<int> ans = nums;\n        ans.insert(ans.end(), nums.begin(), nums.end());\n        return ans;\n    }\n};"
            if is_concat else
            f"// C++ solution for {title}\nclass Solution {{\npublic:\n    void solve() {{}}\n}};"
        )

        java_code = (
            "class Solution {\n    public int[] getConcatenation(int[] nums) {\n        int n = nums.length;\n        int[] ans = new int[2 * n];\n        for (int i = 0; i < n; i++) {\n            ans[i] = nums[i];\n            ans[i + n] = nums[i];\n        }\n        return ans;\n    }\n}"
            if is_concat else
            f"// Java solution for {title}\nclass Solution {{\n    public void solve() {{\n    }}\n}}"
        )

        js_code = (
            "var getConcatenation = function(nums) {\n    return [...nums, ...nums];\n};"
            if is_concat else
            f"// JavaScript solution for {title}\nfunction solve() {{\n    return;\n}}"
        )

        dry_run_steps = [
            {
                "step": 1,
                "title": f"Example 1 Input: {title}",
                "desc": f"Processing initial input data for {title}.",
                "state": {"nums": [1, 4, 1, 2], "target": 8, "current_idx": 0, "hashmap": {}}
            },
            {
                "step": 2,
                "title": "Execution Step Verification",
                "desc": f"Applying optimal algorithm logic to produce target output for {title}.",
                "state": {"nums": [1, 4, 1, 2, 1, 4, 1, 2], "target": 8, "current_idx": 3, "result": [0, 1, 2, 3, 4, 5, 6, 7]}
            }
        ]

        extra_example = {
            "input": "nums = [22, 21, 20, 1]",
            "output": "[22, 21, 20, 1, 22, 21, 20, 1]",
            "explanation": f"Example 2: Secondary test case verification for {title}."
        }

        Problem.objects.update_or_create(
            slug=slug,
            defaults={
                "id_number": id_num,
                "title": title,
                "difficulty": diff,
                "topic": topic_obj,
                "estimated_time": est_time,
                "summary": summary_text,
                "analogy": analogy_text,
                "easy_explanation": easy_exp,
                "bengali_explanation": bengali_exp,
                "intuition": f"Intuition behind {title}: Use optimal invariants.",
                "hint1_tiny": f"Think about key invariants for {title}.",
                "hint2_better": "Use a helper structure or optimal data structure.",
                "hint3_almost": "Return processed result.",
                "code_python": python_code,
                "code_cpp": cpp_code,
                "code_java": java_code,
                "code_javascript": js_code,
                "line_by_line": [
                    {"line": 1, "code": f"# {title} Solution", "explanation": "Define function and receive input parameters"},
                    {"line": 2, "code": "    return result", "explanation": "Return optimal calculated output"}
                ],
                "dry_run_steps": dry_run_steps,
                "time_complexity": "O(N)",
                "time_complexity_reason": "Optimal single pass traversal.",
                "space_complexity": "O(N)",
                "space_complexity_reason": "Auxiliary space complexity.",
                "common_mistakes": [{"title": "Off-by-one index error", "desc": "Check boundary conditions carefully."}],
                "eli10_explanation": f"Imagine solving {title} like a fun game! Break down step by step.",
                "extra_example": extra_example,
                "is_daily_problem": (id_num == 1)
            }
        )

    print(f"✅ Seed completed successfully! Total Problems: {Problem.objects.count()}")

if __name__ == "__main__":
    seed_database()
