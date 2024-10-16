package main

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"

	"gopkg.in/yaml.v3"
)

// Tool represents a tool to be tested with stdin and expected stdout
type Tool struct {
	Name           string `yaml:"name"`
	Stdin          string `yaml:"stdin"`
	ExpectedStdout string `yaml:"expected_stdout"`
}

// readYAML reads the YAML file and parses it into a Tool struct
func readYAML(filePath string) (*Tool, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	var tool Tool
	err = yaml.Unmarshal(data, &tool)
	if err != nil {
		return nil, err
	}

	return &tool, nil
}

// runTest runs the CLI tool with the specified stdin and checks if the stdout matches expected stdout
func runTest(tool Tool) error {
	// Determine the operating system
	var cmd *exec.Cmd
	if runtime.GOOS == "windows" {
		cmd = exec.Command("cmd", "/C", tool.Name) // Windows uses 'cmd' to run commands
	} else {
		cmd = exec.Command("bash", "-c", tool.Name) // Linux/macOS uses 'bash' to run commands
	}

	// Create buffers for stdin and stdout
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	cmd.Stdin = bytes.NewBufferString(tool.Stdin)

	// Run the command
	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("failed to run tool %s: %v\nstderr: %s", tool.Name, err, stderr.String())
	}

	// Compare the output
	// Normalize the output by trimming any extra spaces and newlines
	actualStdout := strings.TrimSpace(stdout.String())
	expectedStdout := strings.TrimSpace(tool.ExpectedStdout)

	if actualStdout != expectedStdout {
		return fmt.Errorf("tool %s failed.\nExpected (%d): %s\n\nGot(%d): %s", tool.Name, len(expectedStdout), expectedStdout, len(actualStdout), actualStdout)
	}

	fmt.Printf("Tool (%s) SUCCESSFULLY PASSED.\n", tool.Name)
	return nil
}

func main() {
	if len(os.Args) < 2 {
		log.Fatalf("Usage: %s <path-to-tool-directory>", filepath.Base(os.Args[0]))
	}

	// Get the tool directory from the arguments
	toolDir := os.Args[1]

	// Look for the YAML file in the given directory
	yamlPath := filepath.Join(toolDir, "test.yaml")
	if _, err := os.Stat(yamlPath); os.IsNotExist(err) {
		log.Fatalf("YAML file not found in the directory: %s", yamlPath)
	}

	// Read and parse the YAML file
	tool, err := readYAML(yamlPath)
	if err != nil {
		log.Fatalf("Error reading YAML file: %v", err)
	}

	// Change working directory to the tool's directory to ensure relative paths work
	if err := os.Chdir(toolDir); err != nil {
		log.Fatalf("Failed to change directory: %v", err)
	}

	// Run the test for this tool
	err = runTest(*tool)
	if err != nil {
		log.Printf("Test failed for tool: %s. Error: %v\n", tool.Name, err)
	}
}
