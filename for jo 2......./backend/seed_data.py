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

    # Topic 2: Two Pointers
    (11, "Valid Palindrome", "valid-palindrome", "Easy", "two-pointers", "10 mins"),
    (12, "Two Sum II - Input Array Is Sorted", "two-sum-ii", "Medium", "two-pointers", "12 mins"),
    (13, "3Sum", "3sum", "Medium", "two-pointers", "20 mins"),
    (14, "Container With Most Water", "container-with-most-water", "Medium", "two-pointers", "15 mins"),
    (15, "Trapping Rain Water", "trapping-rain-water", "Hard", "two-pointers", "25 mins"),

    # Topic 3: Sliding Window
    (16, "Best Time to Buy and Sell Stock", "best-time-to-buy-and-sell-stock", "Easy", "sliding-window", "10 mins"),
    (17, "Longest Substring Without Repeating Characters", "longest-substring-without-repeating", "Medium", "sliding-window", "15 mins"),

    # Topic 4: Stack
    (18, "Valid Parentheses", "valid-parentheses", "Easy", "stack", "8 mins"),
    (19, "Min Stack", "min-stack", "Medium", "stack", "15 mins"),

    # Topic 5: Binary Search
    (20, "Binary Search", "binary-search", "Easy", "binary-search", "8 mins"),

    # Topic 6: Linked List
    (21, "Reverse Linked List", "reverse-linked-list", "Easy", "linked-list", "10 mins"),

    # Topic 7: Trees
    (22, "Invert Binary Tree", "invert-binary-tree", "Easy", "trees", "8 mins"),

    # Topic 11: Dynamic Programming
    (23, "Climbing Stairs", "climbing-stairs", "Easy", "dynamic-programming", "8 mins"),
]

def seed_database():
    print("🌱 Seeding CodeEasy 150 Database...")
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
            "Imagine looking for matching shoes in a locker room. Instead of checking every pair, you keep a notepad of what you need!"
        )

        easy_exp = (
            "Given an integer array nums of length n, create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n."
            if is_concat else
            f"Learn the core trick behind {title} with 10-second rule and line-by-line breakdown."
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
                "title": "Example 1 Input: nums = [1, 4, 1, 2]",
                "desc": "Original input array has n = 4 elements: [1, 4, 1, 2].",
                "state": {"nums": [1, 4, 1, 2], "target": 8, "current_idx": 0, "hashmap": {}}
            },
            {
                "step": 2,
                "title": "Duplicate Array Concatenation",
                "desc": "Append nums [1, 4, 1, 2] to itself ➔ Output: [1, 4, 1, 2, 1, 4, 1, 2].",
                "state": {"nums": [1, 4, 1, 2, 1, 4, 1, 2], "target": 8, "current_idx": 3, "result": [0, 1, 2, 3, 4, 5, 6, 7]}
            }
        ]

        extra_example = {
            "input": "nums = [22, 21, 20, 1]",
            "output": "[22, 21, 20, 1, 22, 21, 20, 1]",
            "explanation": "Example 2: Input array [22, 21, 20, 1] is duplicated to form Output [22, 21, 20, 1, 22, 21, 20, 1]."
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
                "hint1_tiny": "Think about duplicating or tracking indices.",
                "hint2_better": "Use a helper structure or modulo operation.",
                "hint3_almost": "Return duplicated array or map.",
                "code_python": python_code,
                "code_cpp": cpp_code,
                "code_java": java_code,
                "code_javascript": js_code,
                "line_by_line": [
                    {"line": 1, "code": "def getConcatenation(nums):", "explanation": "Define function taking nums array"},
                    {"line": 2, "code": "    return nums + nums", "explanation": "Duplicate and return concatenated array"}
                ],
                "dry_run_steps": dry_run_steps,
                "time_complexity": "O(N)",
                "time_complexity_reason": "Single pass through array of size N.",
                "space_complexity": "O(N)",
                "space_complexity_reason": "Output array of size 2N.",
                "common_mistakes": [{"title": "Off-by-one index error", "desc": "Make sure loop bounds range up to N."}],
                "eli10_explanation": f"Imagine copying cards! {title} is as simple as placing two sets side by side.",
                "extra_example": extra_example,
                "is_daily_problem": (id_num == 1)
            }
        )

    print("✅ Seed completed successfully!")

if __name__ == "__main__":
    seed_database()
