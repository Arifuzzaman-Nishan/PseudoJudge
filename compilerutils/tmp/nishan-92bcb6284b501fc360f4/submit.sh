#!/bin/bash

# Set the time and memory limits (in seconds and bytes)
TIME_LIMIT=$1
MEMORY_LIMIT=${2:-262144}  # Default memory limit set to 256MB (in kilobytes)

compiler="g++ -o /usercode/a.out"
file="a.cpp"
output="/usercode/a.out"

# set the maximum virtual memory usage
mem=$(($MEMORY_LIMIT * 1024))
echo "memory is $mem"

# set the maximum physical memory usage
ulimit -m $(($MEMORY_LIMIT * 1024))

# Create results directory if it does not exist
mkdir -p /usercode/results

exec 2> $"/usercode/results/error.txt"

# Compile the program with g++
$compiler /usercode/$file

if [ $? -ne 0 ]; then
  echo "COMPILATION ERROR" >> "/usercode/results/verdict.txt"
  exit 1
fi

# Array of test case names
test_cases=("sample" "test")

# Flag to track if all tests pass
all_tests_passed=true

for test_case in "${test_cases[@]}"; do
    input_file="/usercode/input/${test_case}Input.txt"
    expected_output="/usercode/output/${test_case}Output.txt"
    output_file="/usercode/results/${test_case}GeneratedOutput.txt"

    exec 1> $output_file

    # Execute the program within the time and memory limits and track execution time
    start_time=$(date +%s%N)
    { /usr/bin/time -v timeout $TIME_LIMIT $output -< $input_file ; } 2>> "/usercode/results/logfile.txt"
    exit_code=$?

    echo "Exit Code: ${exit_code}" >> "/usercode/results/existcode.txt"
    end_time=$(date +%s%N)
    time_taken=$((($end_time - $start_time)/1000000))
    echo "Execution Time: ${time_taken}ms" >> "/usercode/results/logfile.txt"

    # Check the exit code of the previous command
    if [ $exit_code -eq 124 ]; then
        echo "TIME LIMIT EXCEEDED" >> "/usercode/results/verdict.txt"
        all_tests_passed=false
        break
    elif [ $exit_code -eq 137 ]; then
        echo "MEMORY LIMIT EXCEEDED" >> "/usercode/results/verdict.txt"
        all_tests_passed=false
        break
    elif [ $exit_code -eq 139 ]; then
        echo "SEGMENTATION FAULT" >> "/usercode/results/verdict.txt"
        all_tests_passed=false
        break
    elif [ $exit_code -eq 134 ]; then
        echo "ABNORMAL TERMINATION" >> "/usercode/results/verdict.txt"
        all_tests_passed=false
        break
    elif [ $exit_code -ne 0 ]; then
        echo "RUNTIME ERROR" >> "/usercode/results/verdict.txt"
        all_tests_passed=false
        break
    fi

    # Compare program output with expected output
    if diff -wB $output_file $expected_output >/dev/null 2>&1; then
        # echo "${test_case} - ACCEPTED" >> "/usercode/results/verdict.txt"
        echo "ACCEPTED"
    elif diff $output_file $expected_output >/dev/null 2>&1; then
        echo "PRESENTATION ERROR" >> "/usercode/results/verdict.txt"
        all_tests_passed=false
        break
    else
        echo "WRONG ANSWER" >> "/usercode/results/verdict.txt"
        all_tests_passed=false
        break
    fi
done

if $all_tests_passed; then
    echo "ACCEPTED" >> "/usercode/results/verdict.txt"
fi
