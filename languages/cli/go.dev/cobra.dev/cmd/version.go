package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// versionCmd represents the version command
var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version number of GAS CLI",
	Long:  "All software has versions. This is GAS's",
	Run: func(cmd *cobra.Command, args []string) {
		var version = "v0.0.1"
		fmt.Printf("Telegram CLI version: %s\n", version)
	},
}

func init() {
	rootCmd.AddCommand(versionCmd)
}
