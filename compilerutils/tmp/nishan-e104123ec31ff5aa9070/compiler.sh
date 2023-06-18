#!/bin/bash

compiler="g++ -o /usercode/a.out"
file="a.cpp"
output="/usercode/a.out"
input="/usercode/inputFile"
output_file="/usercode/output.txt"
error_file="/usercode/error.txt"

exec  1> $output_file
exec  2> $error_file

$compiler /usercode/$file

if [ $? -eq 0 ]; then
    # Compilation was successful, run the code and redirect the output
    $output < $input
else
    # Compilation error occurred, save the error message
    echo "Compilation error"
fi

# $output -< $"/usercode/inputFile"



# Set the time and memory limits (in seconds and bytes)
# TIME_LIMIT=$1
# MEMORY_LIMIT=$2

# set the maximum virtual memory usage to 256MB
# mem=$(($MEMORY_LIMIT * 1024))
# echo "memory is $mem"

# set the maximum physical memory usage to 256MB
# ulimit -m $(($MEMORY_LIMIT * 1024))

# Compile the program with g++


# if [ $? -eq 0 ]; then
#     # Execute the program within the time and memory limits
#     timeout $TIME_LIMIT $output -< $"/usercode/inputFile"
#     exit_code=$?
#     # Check the exit code of the previous command
#     if [ $exit_code -eq 124 ]; then
#       # The program exceeded the time limit
#       echo "Time limit exceeded"
#     elif [ $exit_code -eq 137 ]; then
#       # The program exceeded the memory limit
#       echo "Memory limit exceeded"
#     elif [ $exit_code -eq 139 ]; then
#       echo "SEGMENTATION FAULT"
#     elif [ $exit_code -eq 0 ]; then
#       echo "AC"
#     fi
# else
#   echo "compilation error"
# fi