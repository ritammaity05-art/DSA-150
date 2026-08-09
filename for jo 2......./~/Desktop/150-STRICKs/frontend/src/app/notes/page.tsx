"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useLanguage } from '@/context/LanguageContext';
import { 
  BookOpen, Sparkles, Search, ArrowLeft, Lightbulb, Code, Layers, 
  Smile, CheckCircle2, Bookmark, Flame, Zap, Award, Book, HelpCircle, 
  ChevronRight, ArrowRight, ShieldCheck, AlignLeft
} from 'lucide-react';

interface BookChapter {
  id: string;
  chapterNumber: number;
  topic: string;
  category: "Foundations" | "Data Structures" | "Algorithms" | "Advanced Patterns";
  icon: string;
  title: string;
  shortSummary: string;
  childAnalogy: string;
  deepConcept: string;
  realLifeRef: string;
  memoryTrick: string;
  timeComplexity: string;
  spaceComplexity: string;
  interviewQuestions: string[];
  codeSnippet: string;
  bengaliBook: string;
}

const DSA_BOOK_CHAPTERS: BookChapter[] = [
  {
    id: "big-o-foundations",
    chapterNumber: 1,
    topic: "Big-O Notation & Complexity",
    category: "Foundations",
    icon: "📖",
    title: "Chapter 1: Big-O Notation & Algorithmic Complexity (The Speedometer of Code)",
    shortSummary: "Learn how to measure code performance using Big-O notation, time complexity, and space complexity.",
    childAnalogy: "Imagine asking 10 friends to find a hidden teddy bear in a room. If you search 1 box at a time, it takes longer as the room gets bigger (O(N)). But if you have a magic wand that points straight to the bear in 1 second, it doesn't matter if the room has 10 boxes or 1,000,000 boxes (O(1))! Big-O is just measuring how much longer your code takes as your data grows.",
    deepConcept: `Big-O Notation measures the WORST-CASE upper bound of execution time or memory growth relative to input size N.

1. O(1) Constant Time: Instant execution. Example: Accessing array[0] or HashMap lookup.
2. O(log N) Logarithmic: Halves search space every step. Example: Binary Search.
3. O(N) Linear Time: Single loop through input of size N. Example: Finding max element.
4. O(N log N) Linearithmic: Optimal comparison sorting. Example: Merge Sort, Quick Sort.
5. O(N²) Quadratic Time: Nested loops over N items. Example: Bubble Sort, Brute force 2D checks.
6. O(2ⁿ) Exponential: Doubling work at each step. Example: Brute force recursive Fibonacci.`,
    realLifeRef: "O(1) = Flipping light switch. O(N) = Reading a book page by page. O(log N) = Looking up a word in a dictionary by splitting in half.",
    memoryTrick: "💡 O(1) Best ➔ O(log N) Great ➔ O(N) Good ➔ O(N log N) Acceptable ➔ O(N²) Avoid ➔ O(2ⁿ) Disaster!",
    timeComplexity: "O(1) < O(log N) < O(N) < O(N log N) < O(N²)",
    spaceComplexity: "RAM Memory Allocation (Stack vs Heap)",
    interviewQuestions: [
      "Why is HashMap lookup O(1) on average but O(N) in worst case?",
      "What is the difference between Time Complexity and Auxiliary Space Complexity?",
      "How does recursion impact the Call Stack space?"
    ],
    codeSnippet: `# Big-O Examples in Python

# O(1) Constant Time
def get_first(arr):
    return arr[0]

# O(N) Linear Time
def find_target(arr, target):
    for item in arr:
        if item == target:
            return True
    return False

# O(N^2) Quadratic Time (Nested loops)
def print_pairs(arr):
    for i in arr:
        for j in arr:
            print(i, j)`,
    bengaliBook: `অধ্যায় ১: বিগ-ও নোটেশন এবং কমপ্লেক্সিটি বিশ্লেষণ

বিগ-ও (Big-O) হলো কোডের কার্যক্ষমতা মাপার মিটার। এটি দিয়ে আমরা বুঝি ডেটার পরিমাণ (N) বাড়লে কোডটি কত দ্রুত বা ধীরগতিতে চলবে।

১. O(1) কনস্ট্যান্ট: ডেটা যত বড়ই হোক, সময় লাগবে মাত্র ১ সেকেন্ড (যেমন: অ্যারের ১ম উপাদান পড়া বা হ্যাশম্যাপ সার্চ)।
২. O(log N) লগারিথমিক: প্রতি ধাপে কাজ অর্ধেক হয়ে যায় (যেমন: বাইনারি সার্চ)।
৩. O(N) লিনিয়ার: একটা লুপ চালিয়ে পুরো অ্যারে দেখা।
৪. O(N²) কোয়াড্রাটিক: ডাবল নেস্টেড লুপ (যা বড় ডেটার জন্য খুব ধীরগতিতে চলে)।`
  },
  {
    id: "arrays-dynamic-arrays",
    chapterNumber: 2,
    topic: "Arrays & Dynamic Arrays",
    category: "Data Structures",
    icon: "📦",
    title: "Chapter 2: Arrays & Dynamic Arrays (The Numbered School Lockers)",
    shortSummary: "Master contiguous memory blocks, dynamic resizing, index access, and array manipulation patterns.",
    childAnalogy: "Imagine an Array is a row of school lockers glued together in a straight line numbered 0, 1, 2, 3. Because all lockers are glued side-by-side in exact memory locations, if you know the number, you can jump straight to locker #3 in 1 step! A Dynamic Array is a magic locker row that automatically doubles its total lockers when it runs out of space!",
    deepConcept: `Arrays store elements in CONTIGUOUS (consecutive) memory locations.

Key Operations & Complexities:
- Read by Index: O(1) Instant because memory address = base_address + index * element_size.
- Update by Index: O(1).
- Search Value (Unsorted): O(N) must scan element by element.
- Insert / Delete at End: O(1) amortized for Dynamic Arrays.
- Insert / Delete at Beginning / Middle: O(N) because all remaining elements must shift left/right.

Dynamic Array Resizing:
When capacity is reached, dynamic arrays allocate a NEW array of DOUBLE size (2x), copy over existing N elements (O(N)), and free old memory. Amortized insertion cost remains O(1).`,
    realLifeRef: "Fixed Array = 50 numbered seats in a movie theatre. Dynamic Array = Resizable accordion bus that expands when more passengers board.",
    memoryTrick: "💡 Array Index Access = O(1). Insert/Delete in Middle = O(N) due to element shifting.",
    timeComplexity: "Access: O(1) | Search: O(N) | Insertion: O(1) amortized",
    spaceComplexity: "O(N) contiguous memory",
    interviewQuestions: [
      "How does a Dynamic Array achieve O(1) amortized insertion time?",
      "Why is array element shifting O(N) when inserting at index 0?",
      "Explain the difference between array size and capacity."
    ],
    codeSnippet: `# Array operations in Python
arr = [10, 20, 30, 40]

# O(1) Index Access
print(arr[2])  # Output: 30

# O(N) Search
target = 30
found = target in arr  # Scans elements sequentially

# O(N) Insert at index 1 (Shifts elements right)
arr.insert(1, 15)  # [10, 15, 20, 30, 40]`,
    bengaliBook: `অধ্যায় ২: অ্যারে এবং ডাইনামিক অ্যারে

অ্যারে হলো পরপর মেমোরি ব্লকে সাজানো উপাদান। 

১. ইন্ডেক্স দিয়ে পড়া: O(1) সময় (কারণ কম্পিউটারের মেমোরিতে প্রতিটি ঘরের ঠিকানা হিসাব করা সহজ)।
২. ভেতরে উপাদান ঢোকানো বা মোছা: O(N) সময় (কারণ বাকি সব উপাদানকে ডানে বা বামে সরাতে হয়)।
৩. ডাইনামিক অ্যারে জাদুকরীভাবে পূর্ণ হয়ে গেলে নিজের আকার দ্বিগুণ (2x) করে নেয়।`
  },
  {
    id: "hash-tables-maps",
    chapterNumber: 3,
    topic: "Hash Tables & HashMaps",
    category: "Data Structures",
    icon: "🔑",
    title: "Chapter 3: Hash Tables & HashMaps (The Magic Key-Value Phonebook)",
    shortSummary: "Understand hash functions, key-value mapping, collision resolution, and instant O(1) lookup tables.",
    childAnalogy: "Imagine a magic phonebook! You whisper your friend's name 'Ritam', and the book instantly converts the letters into a secret locker key number using a Hash Machine! You open locker key #7 and grab your friend's phone number immediately in 1 second! No searching required!",
    deepConcept: `A Hash Table uses a HASH FUNCTION to map arbitrary keys (strings, numbers, objects) to integer indices of an array bucket.

Hash Table Mechanics:
1. Key ➔ Hash Function ➔ Index Hash Code.
2. Store Value at array[Index].
3. Average Lookup / Insert / Delete: O(1).

Collision Handling (When 2 keys generate the same index):
- Separate Chaining: Each bucket holds a Linked List of key-value pairs.
- Open Addressing (Linear Probing): Searches next available slot sequentially.

Worst-Case Complexity:
If all keys hash to the same bucket (Hash Collision attack), lookup degrades to O(N). Good hash functions ensure uniform distribution.`,
    realLifeRef: "Coat check room at a theatre where coat ticket #42 instantly retrieves your jacket.",
    memoryTrick: "💡 Key ➔ Value | Instant O(1) average lookup | Key must be Hashable/Immutable.",
    timeComplexity: "Lookup / Insert / Delete: O(1) Average, O(N) Worst",
    spaceComplexity: "O(N) bucket storage",
    interviewQuestions: [
      "What causes hash collisions and how does Separate Chaining resolve them?",
      "Why must HashMap keys be immutable in programming languages?",
      "What is the Load Factor threshold for resizing a HashMap?"
    ],
    codeSnippet: `# HashMap (Dictionary) in Python
hashmap = {}

# Insert Key-Value O(1)
hashmap["apple"] = 3
hashmap["banana"] = 5

# Instant Lookup O(1)
if "apple" in hashmap:
    print("Apple count:", hashmap["apple"])  # 3

# Frequency Counter Pattern
text = "codeeasy"
freq = {}
for char in text:
    freq[char] = freq.get(char, 0) + 1
# freq = {'c': 1, 'o': 1, 'd': 1, 'e': 3, 'a': 1, 's': 1, 'y': 1}`,
    bengaliBook: `অধ্যায় ৩: হ্যাশ টেবিল এবং হ্যাশম্যাপ

হ্যাশম্যাপ হলো কী-ভ্যালু (Key-Value) জোড়ায় ডেটা রাখার সবচেয়ে কার্যকরী স্ট্রাকচার।

১. হ্যশ ফাংশন যেকোনো কি-কে একটি সুনির্দিষ্ট মেমোরি পজিশনে রূপান্তর করে।
২. খোঁজা (Lookup), যোগ করা (Insert), মোছা (Delete): গড়ে মাত্র O(1) সময় লাগে।
৩. কোলিশন (Collision): যদি দুটো ভিন্ন কী একই মেমোরি ঘর পায়, তবে লিঙ্কড লিস্ট তৈরি করে তা সমাধান করা হয়।`
  },
  {
    id: "two-pointers-pattern",
    chapterNumber: 4,
    topic: "Two Pointers Pattern",
    category: "Algorithms",
    icon: "👈👉",
    title: "Chapter 4: Two Pointers Pattern (The Opposite Bridge Walkers)",
    shortSummary: "Learn converging pointers, fast & slow pointers, palindrome checks, and two sum in sorted arrays.",
    childAnalogy: "Imagine two friends starting at opposite ends of a long wooden bridge. Friend 1 stands at start (Left=0), Friend 2 stands at end (Right=N-1). If their combined weight is too light, Left friend steps forward! If too heavy, Right friend steps back! They meet in the middle in 1 single trip!",
    deepConcept: `The Two Pointers pattern uses two integer index variables (pointers) to traverse a data structure simultaneously.

Common Variants:
1. Converging Pointers (Opposite Ends): Start at index 0 and index N-1. Move inwards based on condition. Perfect for Sorted Arrays, Palindromes, 3Sum, Container With Most Water.
2. Fast & Slow Pointers (Floyd's Cycle Detection): Slow pointer moves 1 step, Fast pointer moves 2 steps. Used for Linked List cycle detection and middle element retrieval.
3. Parallel Pointers (Same Direction): Both pointers move forward at different speeds. Used for removing duplicates in-place.`,
    realLifeRef: "Checking if a word reads the same backwards by comparing first & last letters inwards.",
    memoryTrick: "💡 Sorted Array + Pair Search ➔ Left=0, Right=N-1 | Cycle Detection ➔ Slow=1x, Fast=2x.",
    timeComplexity: "O(N) linear time single pass",
    spaceComplexity: "O(1) memory space",
    interviewQuestions: [
      "Why does Two Pointers require the array to be sorted for Two Sum?",
      "Explain Floyd's Tortoise and Hare cycle detection algorithm.",
      "How do you extend Two Pointers to solve the 3Sum problem in O(N²) time?"
    ],
    codeSnippet: `# Two Pointers: Check Valid Palindrome
def isPalindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

print(isPalindrome("racecar"))  # True`,
    bengaliBook: `অধ্যায় ৪: টু পয়েন্টার টেকনিক

টু পয়েন্টার হলো একসাথে দুটি কার্সর ব্যবহার করে অ্যারে স্ক্যান করা।

১. বিপরীতমুখী পয়েন্টার: বামে Left=0 এবং ডানে Right=N-1 থেকে শুরু করে মাঝে আসা (সাজানো অ্যারেতে সংখ্যা খোঁজা বা প্যালিন্ড্রোম চেক করা)।
২. স্লো ও ফাস্ট পয়েন্টার: একটি পয়েন্টার ১ ধাপ এবং অন্যটি ২ ধাপ চলে (সাইকেল বা লুপ সনাক্ত করা)।`
  },
  {
    id: "sliding-window-pattern",
    chapterNumber: 5,
    topic: "Sliding Window Pattern",
    category: "Algorithms",
    icon: "🪟",
    title: "Chapter 5: Sliding Window Pattern (The Moving Magnifying Glass)",
    shortSummary: "Master contiguous subarray tracking, fixed & dynamic windows, and substring problem-solving.",
    childAnalogy: "Imagine holding a small rectangular cardboard window frame over a row of numbers. As you slide the window frame 1 box to the right, 1 old number leaves from the left side 👈, and 1 new number enters from the right side 👉! You only calculate the difference instead of re-adding all numbers!",
    deepConcept: `Sliding Window optimizes contiguous subarray / substring problems from O(N²) to O(N) by maintaining a running window state.

Window Types:
1. Fixed-Size Window (Length K):
   - Initialize window of size K.
   - For each step: Add element at right pointer, subtract element at left pointer (right - K).
2. Dynamic Variable-Size Window:
   - Expand Right pointer to include elements until condition is met or broken.
   - Shrink Left pointer to restore validity.
   - Track max/min window size.

Classic Applications:
- Maximum Sum Subarray of Size K
- Longest Substring Without Repeating Characters
- Minimum Window Substring`,
    realLifeRef: "Calculating average heart rate over the last 5 minutes while running.",
    memoryTrick: "💡 Contiguous Subarray / Substring ➔ Expand Right pointer, Shrink Left when invalid.",
    timeComplexity: "O(N) linear time pass",
    spaceComplexity: "O(1) or O(K) frequency map",
    interviewQuestions: [
      "What is the condition to shrink the left pointer in a variable sliding window?",
      "Why is Sliding Window faster than calculating subarray sum from scratch?",
      "How do you maintain character frequency in Minimum Window Substring?"
    ],
    codeSnippet: `# Sliding Window: Longest Substring Without Repeating Characters
def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len`,
    bengaliBook: `অধ্যায় ৫: স্লাইডিং উইন্ডো প্যাটার্ন

সাব-অ্যারে বা সাব-স্ট্রিং এর জন্য স্লাইডিং উইন্ডো একটি জাদুকরী পদ্ধতি।

১. নির্দিষ্ট উইন্ডো (Size K): প্রতিবার ডানদিকের নতুন সংখ্যা যোগ হয় এবং বামদিকের পুরনো সংখ্যা বিয়োগ হয়।
২. পরিবর্তনশীল উইন্ডো: শর্ত পূরণ না হওয়া পর্যন্ত ডানদিকের পয়েন্টার বাড়াতে থাকুন, শর্ত ভঙ্গ হলে বামদিকের পয়েন্টার ছোট করুন।`
  },
  {
    id: "stack-and-queue",
    chapterNumber: 6,
    topic: "Stacks & Queues",
    category: "Data Structures",
    icon: "🥞",
    title: "Chapter 6: Stacks & Queues (Dinner Plates vs Ice Cream Line)",
    shortSummary: "Learn LIFO stack mechanics, FIFO queue behavior, monotonic stacks, and breadth-first search queues.",
    childAnalogy: "Stack = A stack of heavy dinner plates 🥞. The LAST plate put on top is the FIRST plate you take off (Last In, First Out)! Queue = People standing in line for ice cream 🍦. The FIRST person who got in line gets served FIRST (First In, First Out)!",
    deepConcept: `Stacks & Queues are linear data structures defined by their insertion and removal rules.

Stack (LIFO - Last In First Out):
- Operations: push(x) O(1), pop() O(1), peek() O(1).
- Uses: Function call stack (recursion), Undo/Redo (Ctrl+Z), Valid Parentheses matching, Monotonic Stack (Next Greater Element).

Queue (FIFO - First In First Out):
- Operations: enqueue(x) O(1), dequeue() O(1), front() O(1).
- Uses: Breadth-First Search (BFS) level order traversal, Task queues, Printer job buffers.

Monotonic Stack Pattern:
Maintains stack elements in strictly increasing or decreasing order. Used to find next greater or previous smaller elements in O(N) total time.`,
    realLifeRef: "Stack = Browser Back button history. Queue = Ticket booking line at a railway counter.",
    memoryTrick: "💡 Stack = LIFO (Plates) | Queue = FIFO (Ice cream line) | Monotonic Stack = Next Greater Item.",
    timeComplexity: "Push / Pop / Enqueue / Dequeue: O(1)",
    spaceComplexity: "O(N) memory storage",
    interviewQuestions: [
      "How do you implement a Queue using two Stacks?",
      "What is a Monotonic Stack and when would you use it?",
      "Why is array pop(0) O(N) while deque popleft() is O(1)?"
    ],
    codeSnippet: `# Monotonic Stack: Next Greater Element
def nextGreaterElement(nums):
    res = [-1] * len(nums)
    stack = []  # Stores indices
    for i, num in enumerate(nums):
        while stack and nums[stack[-1]] < num:
            idx = stack.pop()
            res[idx] = num
        stack.append(i)
    return res

print(nextGreaterElement([2, 1, 2, 43, 3]))  # Output: [43, 2, 43, -1, -1]`,
    bengaliBook: `অধ্যায় ৬: স্ট্যাক এবং কিউ

১. স্ট্যাক (LIFO): শেষের উপাদান আগে উঠে (যেমন: প্লেটের স্তূপ, ব্রাউজারের ব্যাক বাটন)।
২. কিউ (FIFO): প্রথম উপাদান আগে বের হয় (যেমন: টিকিট কাটার লাইন)।
৩. মনোটোনিক স্ট্যাক: পর পর বড় বা ছোট উপাদান হিসাব রাখার কার্যকর টেকনিক।`
  },
  {
    id: "binary-search-deep",
    chapterNumber: 7,
    topic: "Binary Search",
    category: "Algorithms",
    icon: "🔍",
    title: "Chapter 7: Binary Search & Binary Search on Answer (The Dictionary Splitter)",
    shortSummary: "Master O(log N) logarithmic search, rotated array searches, and binary search on answer spaces.",
    childAnalogy: "Imagine guessing a secret number between 1 and 100. If you guess 50 and I say 'TOO HIGH!', you instantly throw away numbers 50 to 100! Next try 25. Every guess cuts your remaining choices in HALF! In just 7 guesses, you can find ANY number out of 100!",
    deepConcept: `Binary Search reduces the search space by half at each step on a SORTED range.

Standard Algorithm:
1. Initialize low = 0, high = N - 1.
2. Calculate mid = low + (high - low) // 2 (Prevents integer overflow).
3. If arr[mid] == target: return mid.
4. If arr[mid] < target: low = mid + 1.
5. Else: high = mid - 1.

Binary Search on Answer Space:
When searching for an optimal minimum or maximum integer value (e.g. Koko Eating Bananas, Capacity to Ship Packages), if the feasibility function is monotonic (True, True, True, False, False), Binary Search finds the boundary in O(log(Max - Min) * Cost) time.`,
    realLifeRef: "Opening a printed phonebook dictionary in the middle to find a name starting with 'N'.",
    memoryTrick: "💡 Must be Sorted or Monotonic | Mid = low + (high-low)//2 | Halves search space O(log N).",
    timeComplexity: "O(log N) logarithmic time",
    spaceComplexity: "O(1) iterative space",
    interviewQuestions: [
      "Why is mid calculated as low + (high - low) // 2 instead of (low + high) // 2?",
      "How do you perform Binary Search in a Rotated Sorted Array?",
      "Explain Binary Search on Answer space with an example."
    ],
    codeSnippet: `# Binary Search on Rotated Sorted Array
def searchRotated(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target: return mid
        
        # Left half is sorted
        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return -1`,
    bengaliBook: `অধ্যায় ৭: বাইনারি সার্চ এবং অ্যানসার স্পেস সার্চ

বাইনারি সার্চ প্রতিটি ধাপে অর্ধেক ডেটা বাদ দিয়ে দেয়।

১. সাজানো (Sorted) অ্যারে বা মনোটোনিক শর্ত থাকতে হবে।
২. ১০০ কোটি ডেটা থেকেও মাত্র ৩০ টি পদক্ষেপে সঠিক জিনিস খুঁজে বের করা যায় (O(log N))।
৩. ইনটিজার ওভারফ্লো এড়াতে mid = low + (high - low) // 2 ব্যবহার করুন।`
  },
  {
    id: "linked-lists-deep",
    chapterNumber: 8,
    topic: "Linked Lists",
    category: "Data Structures",
    icon: "🔗",
    title: "Chapter 8: Linked Lists & Pointer Manipulations (The Treasure Hunt Cards)",
    shortSummary: "Learn Singly & Doubly Linked Lists, pointer reversal, dummy nodes, and middle node retrieval.",
    childAnalogy: "Imagine a treasure hunt game! Card #1 says: 'Go to sofa'. Sofa has Card #2: 'Go under bed'. Each card holds a piece of candy AND a written note pointing to where the NEXT card is hidden! If you erase a note and write a new address, you change the whole game!",
    deepConcept: `A Linked List consists of nodes where each node contains Data and a Pointer (memory address) to the Next node.

Types of Linked Lists:
1. Singly Linked List: Head ➔ Node(val, next) ➔ Node(val, next) ➔ None.
2. Doubly Linked List: Head ⇆ Node(prev, val, next) ⇆ Node(prev, val, next) ⇆ None.
3. Circular Linked List: Tail.next points back to Head.

Key Techniques:
- Dummy Head Node: Simplifies edge cases when inserting/deleting the first element.
- Two Pointers (Slow & Fast):
  - Middle Node: Slow moves 1 step, Fast moves 2 steps. When Fast hits end, Slow is at middle.
  - Cycle Detection: If Slow and Fast meet, a cycle exists.
- Pointer Reversal: Swap prev, curr, and next pointers step-by-step in O(N) time.`,
    realLifeRef: "Train carriages coupled together in series.",
    memoryTrick: "💡 Nodes scattered in memory | Reverse ➔ prev, curr, next swap | Fast & Slow ➔ Cycle/Middle.",
    timeComplexity: "Access/Search: O(N) | Prepend/Insert next: O(1)",
    spaceComplexity: "O(N) node pointers",
    interviewQuestions: [
      "How do you reverse a Singly Linked List in-place in O(N) time?",
      "Why is a Dummy Node useful when working with Linked List problems?",
      "Explain how to find the starting node of a Linked List cycle."
    ],
    codeSnippet: `# Reverse Linked List In-Place
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head: ListNode) -> ListNode:
    prev = None
    curr = head
    while curr:
        nxt = curr.next  # Save next node
        curr.next = prev # Reverse pointer
        prev = curr      # Move prev forward
        curr = nxt       # Move curr forward
    return prev`,
    bengaliBook: `অধ্যায় ৮: লিঙ্কড লিস্ট এবং পয়েন্টার টেকনিক

লিঙ্কড লিস্টে নোডগুলো মেমোরিতে ছড়ানো থাকে এবং পয়েন্টার দিয়ে যুক্ত থাকে।

১. দামি নোড (Dummy Node): প্রথম নোড পরিবর্তনের সময় কোডের ভুল এড়াতে সাহায্য করে।
২. ইন-প্লেস রিভার্স (Reverse): prev, curr, next পয়েন্টার ঘুরিয়ে পুরো লিস্ট উল্টে দেওয়া।
৩. ফাস্ট ও স্লো পয়েন্টার: লিস্টের মাঝের নোড বের করা বা লুপ সনাক্ত করা।`
  },
  {
    id: "trees-graphs-deep",
    chapterNumber: 9,
    topic: "Trees & Binary Trees",
    category: "Data Structures",
    icon: "🌳",
    title: "Chapter 9: Trees & Binary Search Trees (The Organized Tree Structure)",
    shortSummary: "Master Binary Trees, BST properties, DFS traversals (Inorder, Preorder, Postorder), and BFS level order.",
    childAnalogy: "Imagine a tree rooted at the top! The Root boss stands at top. Each node has up to 2 children (Left child 👈 and Right child 👉). In a Binary Search Tree, all SMALLER numbers go to the LEFT branch, and all BIGGER numbers go to the RIGHT branch!",
    deepConcept: `A Tree is a hierarchical connected acyclic graph with N nodes and N-1 edges.

Binary Search Tree (BST) Invariant:
For every node X:
- All values in Left Subtree < X.val.
- All values in Right Subtree > X.val.
- Inorder Traversal (Left ➔ Root ➔ Right) visits BST nodes in STRICTLY SORTED ORDER!

Traversal Algorithms:
1. Depth-First Search (DFS) via Recursion / Stack:
   - Preorder (Root ➔ Left ➔ Right): Cloning / Copying tree structure.
   - Inorder (Left ➔ Root ➔ Right): Sorted BST values.
   - Postorder (Left ➔ Right ➔ Root): Deleting / Evaluating expression trees.
2. Breadth-First Search (BFS) via Queue: Level-by-level traversal.`,
    realLifeRef: "Computer hard drive folder hierarchy (C: ➔ Program Files ➔ App ➔ config.json).",
    memoryTrick: "💡 BST: Left < Root < Right | Inorder = Sorted output | BFS = Queue | DFS = Recursion.",
    timeComplexity: "Search / Insert: O(log N) balanced, O(N) skewed",
    spaceComplexity: "O(H) recursion stack height",
    interviewQuestions: [
      "Why does Inorder Traversal of a BST yield sorted numbers?",
      "How do you check if a Binary Tree is a valid Binary Search Tree?",
      "What is the difference between BFS Level Order and DFS Traversal?"
    ],
    codeSnippet: `# Validate Binary Search Tree (DFS)
def isValidBST(root, low=float('-inf'), high=float('inf')) -> bool:
    if not root:
        return True
    if not (low < root.val < high):
        return False
    return (isValidBST(root.left, low, root.val) and 
            isValidBST(root.right, root.val, high))`,
    bengaliBook: `অধ্যায় ৯: ট্রাই ও বাইনারি সার্চ ফ্রি

১. বাইনারি সার্চ ফ্রি (BST): বামপাশের সব ছোট, ডানপাশের সব বড়।
২. ইন-অর্ডার ট্রাভার্সাল (Inorder): BST-এর সব সংখ্যা ছোট থেকে বড় ক্রমে সাজিয়ে দেয়।
৩. বিএফএস (BFS): কিউ (Queue) ব্যবহার করে সারিবদ্ধভাবে প্রতিটা লেভেল ধাপে ধাপে দেখা।`
  },
  {
    id: "dp-recursion-deep",
    chapterNumber: 10,
    topic: "Dynamic Programming",
    category: "Advanced Patterns",
    icon: "🧩",
    title: "Chapter 10: Dynamic Programming & Memoization (The Notepad Memory Method)",
    shortSummary: "Learn memoization, tabulation, overlapping subproblems, 1D/2D DP, and knapsack problem patterns.",
    childAnalogy: "Teacher asks: 'What is 1 + 1 + 1 + 1 + 1?' Child counts: '5!'. Teacher adds '+ 1' at the end: 'What is it now?' Child instantly says '6!' without re-counting the first 5 ones because they MEMORIZED the previous answer on paper!",
    deepConcept: `Dynamic Programming solves complex problems by breaking them down into OVERLAPPING SUBPROBLEMS and storing intermediate answers.

Core Requirements for DP:
1. Overlapping Subproblems: The same sub-calculations are computed repeatedly.
2. Optimal Substructure: Optimal solution of problem contains optimal solutions of its subproblems.

Two Approaches:
1. Top-Down DP (Recursion + Memoization):
   - Write recursive relation.
   - Use a HashMap or Array to cache results of memo[state].
2. Bottom-Up DP (Tabulation):
   - Fill an iterative DP array from smallest base cases up to target N.

Classic DP Patterns:
- 1D DP: Climbing Stairs, House Robber, Min Cost Climbing Stairs.
- 2D DP: Unique Paths, Longest Common Subsequence (LCS), 0/1 Knapsack, Coin Change.`,
    realLifeRef: "Google Maps caching route travel times so it doesn't recalculate every second.",
    memoryTrick: "💡 DP = Recursion + Memoization Table | Tabulation = Bottom-Up Iteration.",
    timeComplexity: "O(N) or O(N*M) with DP table",
    spaceComplexity: "O(N) or O(N*M) memory array",
    interviewQuestions: [
      "What is the difference between Top-Down Memoization and Bottom-Up Tabulation?",
      "How do you identify if a problem can be solved using Dynamic Programming?",
      "How do you optimize space complexity in 1D/2D DP problems?"
    ],
    codeSnippet: `# 1D Dynamic Programming: Climbing Stairs (Bottom-Up)
def climbStairs(n: int) -> int:
    if n <= 2: return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

print(climbStairs(5))  # Output: 8`,
    bengaliBook: `অধ্যায় ১০: ডাইনামিক প্রোগ্রামিং

ডাইনামিক প্রোগ্রামিং (DP) হলো খাতার কোণায় আগের হিসাব লিখে রাখার জাদুকরী পদ্ধতি।

১. মেমোইজেশন (Memoization): রিকার্শনের সাথে উত্তর খাতায় (Array/HashMap) সেভ রাখা।
২. ট্যাবুলেশন (Tabulation): ছোট হিসাব থেকে শুরু করে লুপ চালিয়ে বড় লক্ষ্য পূরণ করা।
৩. সময় বাঁচে: যে অংক করতে ২ কোটি বছর লাগতো, তা মাত্র ১ মিলি-সেকেন্ডে শেষ হয়!`
  }
];

export default function DSANotesPage() {
  const { isBengali } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeChapterId, setActiveChapterId] = useState<string>(DSA_BOOK_CHAPTERS[0].id);

  const filteredChapters = DSA_BOOK_CHAPTERS.filter((chap) => {
    const matchesSearch = 
      chap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chap.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chap.childAnalogy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chap.shortSummary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCat = selectedCategory === 'all' || chap.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const activeChap = DSA_BOOK_CHAPTERS.find((c) => c.id === activeChapterId) || DSA_BOOK_CHAPTERS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col font-sans">
      
      {/* Header Navbar */}
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Book Cover Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-2xl space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white mb-3">
                <ArrowLeft className="w-4 h-4" />
                <span>{isBengali ? "হোমে ফিরে যান" : "Back to Home"}</span>
              </Link>
              
              <div className="flex items-center gap-3.5">
                <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 text-slate-950 font-black text-3xl shadow-xl shadow-amber-500/20">
                  📖
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {isBengali ? "DSA বই ও মাস্টার নোটবুক (Interactive DSA Textbook)" : "DSA Interactive Master Textbook & Handbook"}
                  </h1>
                  <p className="text-sm text-amber-300 font-bold mt-1 flex items-center gap-2">
                    <Award className="w-4.5 h-4.5 text-amber-400" />
                    <span>{isBengali ? "অধ্যায়ভিত্তিক বিস্তারিত গাইড • ৫ বছরের বাচ্চার মতো অতি সহজ ব্যাখ্যা • Powered by Ritam" : "Complete Chapter-by-Chapter Guide • 5-Year-Old Child Explanations • Powered by Ritam"}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isBengali ? "বইয়ের অধ্যায় ও টপিক খুঁজুন..." : "Search chapters, analogies & concepts..."}
                className="w-full bg-slate-900/90 text-sm text-gray-200 placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500/60 transition-all"
              />
            </div>
          </div>

          {/* Book Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {['all', 'Foundations', 'Data Structures', 'Algorithms', 'Advanced Patterns'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {cat === 'all' ? (isBengali ? 'সকল অধ্যায় (All Chapters)' : 'All Book Chapters') : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Book Reading Layout (Chapters Sidebar + Deep Chapter Reader) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Chapters Table of Contents */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <AlignLeft className="w-4 h-4" />
                <span>{isBengali ? "সূচিপত্র (Table of Contents)" : "Table of Contents"}</span>
              </span>
              <span className="font-mono text-gray-500">{filteredChapters.length} Chapters</span>
            </div>

            <div className="space-y-3 max-h-[800px] overflow-y-auto pr-1">
              {filteredChapters.map((chap) => {
                const isActive = chap.id === activeChap.id;

                return (
                  <div
                    key={chap.id}
                    onClick={() => setActiveChapterId(chap.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-indigo-500/20 border-amber-400 shadow-xl scale-[1.01]'
                        : 'bg-slate-900/80 border-white/10 hover:border-white/20 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{chap.icon}</span>
                        <span className="text-xs font-bold text-amber-300 font-mono">Ch. {chap.chapterNumber}</span>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white/10 text-gray-300 border border-white/10">
                        {chap.category}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1 leading-snug">
                      {chap.topic}
                    </h4>

                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {chap.shortSummary}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep Chapter Reader */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Chapter Header Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-slate-950/95 relative overflow-hidden space-y-6 shadow-2xl">
              
              <div className="pb-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 text-xs font-extrabold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase font-mono">
                    Chapter {activeChap.chapterNumber} • {activeChap.category}
                  </span>
                  <span className="text-xs text-cyan-400 font-mono font-bold">
                    {activeChap.timeComplexity}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                  <span>{activeChap.icon}</span>
                  <span>{activeChap.title}</span>
                </h2>
              </div>

              {/* 5-Year-Old Child Analogy Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-400/40 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
                  <Smile className="w-5 h-5 text-amber-400 animate-bounce" />
                  <span>{isBengali ? "৫ বছরের বাচ্চার গল্প (5-Year-Old Child Story Analogy)" : "5-Year-Old Child Story Analogy"}</span>
                </div>
                <p className="text-sm text-amber-100 leading-relaxed font-medium">
                  {activeChap.childAnalogy}
                </p>
              </div>

              {/* Deep Conceptual Breakdown (Book Chapter) */}
              <div className="space-y-3 p-6 rounded-2xl bg-slate-900/90 border border-white/10">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{isBengali ? "অধ্যায়ের বিস্তারিত মূল লজিক (Deep Conceptual Theory)" : "Deep Conceptual Theory"}</span>
                </h3>
                <div className="text-sm text-gray-200 leading-relaxed font-sans whitespace-pre-line space-y-2">
                  {activeChap.deepConcept}
                </div>
              </div>

              {/* Bengali Book Translation */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>{isBengali ? "সহজ বাংলা পাঠ্যবই সংস্করণ" : "Bengali Textbook Edition"}</span>
                </div>
                <div className="text-sm text-gray-200 leading-relaxed font-sans whitespace-pre-line">
                  {activeChap.bengaliBook}
                </div>
              </div>

              {/* Real Life Reference & Case Study */}
              <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-indigo-400" />
                  <span>{isBengali ? "বাস্তব জীবনের প্রয়োগ (Real-World Case Study)" : "Real-World Application"}</span>
                </div>
                <p className="text-xs text-indigo-100 leading-relaxed">
                  {activeChap.realLifeRef}
                </p>
              </div>

              {/* Cheat Sheet & Memory Trick */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-semibold leading-relaxed flex items-center gap-3">
                <Zap className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block mb-0.5">{isBengali ? "শর্টকাট মেমোরি ট্রিক:" : "Memory Cheat Sheet Trick:"}</span>
                  {activeChap.memoryTrick}
                </div>
              </div>

              {/* Top Interview Questions */}
              <div className="space-y-3 p-5 rounded-2xl bg-slate-900/80 border border-white/10">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>{isBengali ? "ইন্টারভিউতে আসা সেরা প্রশ্নাবলী" : "Top Technical Interview Questions"}</span>
                </h4>
                <ul className="space-y-2">
                  {activeChap.interviewQuestions.map((q, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Python Code Template */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-blue-400" />
                    <span>{isBengali ? "অধ্যায়ের সোর্স কোড টেমপ্লেট" : "Code Template"}</span>
                  </span>
                  <span className="font-mono text-cyan-400">{activeChap.spaceComplexity}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs text-gray-200 overflow-x-auto leading-relaxed">
                  <pre>{activeChap.codeSnippet}</pre>
                </div>
              </div>

              {/* Chapter Navigation Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>150 STRICKs DSA Master Book</span>
                <span className="text-cyan-400 font-bold">POWERED BY RITAM</span>
              </div>

            </div>

          </div>

        </div>

      </main>

      <footer className="border-t border-white/10 py-8 bg-slate-950 text-center text-xs font-bold text-cyan-400">
        150 STRICKs • POWERED BY RITAM • DSA Interactive Master Textbook
      </footer>

    </div>
  );
}
